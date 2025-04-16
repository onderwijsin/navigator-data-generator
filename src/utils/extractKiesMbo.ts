import dotenv from 'dotenv';
import { useConfig } from "../composables/use-config";
import { ofetch } from "ofetch";
import type { Export, MOrganizationExtended, MLocationExtended, MProductExtended, StudiesExport, StudyDetails, MLocation, MProduct } from "../types/kiesmbo.hardcoded";
import defu from 'defu';
import { joinURL } from "ufo";
import { slugify } from '.';
dotenv.config();
const { kiesmbo } = useConfig();

const cacheEnabled = process.env.ENABLE_CACHE === 'true'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0') // Cache TTL in milliseconds

import * as fs from 'fs';
import * as path from 'path';
const cacheDir = path.resolve(process.cwd(), '.cache/kiesmbo'); // Cache directory
if (cacheEnabled && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

import { safeAsync } from './fetch'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const rate_limit = kiesmbo.rateLimit || 20; // Rate limit for Hovi API requests
const batch_size = kiesmbo.batchSize || 20; // Batch size for Hovi API requests

// Create a queue to manage rate-limited requests
const requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

/**
 * Processes the request queue in batches, adhering to the rate limit.
 * Ensures that requests are executed in parallel within the defined batch size
 * and enforces a delay between requests to comply with the rate limit.
 *
 * Prevents multiple queue processors from running simultaneously.
 *
 * @returns A promise that resolves when the queue is fully processed.
 *
 * @example
 * // Add requests to the queue
 * requestQueue.push(() => fetchData());
 * requestQueue.push(() => fetchOtherData());
 *
 * // Start processing the queue
 * await processQueue();
 */
const processQueue = async () => {
    if (isProcessingQueue) return; // Prevent multiple queue processors
    isProcessingQueue = true;

    while (requestQueue.length > 0) {
        // Take a batch of requests based on the batch size
        const batch = requestQueue.splice(0, batch_size);

        // Execute the batch in parallel
        await Promise.all(
            batch.map(async (request) => {
                await request(); // Execute each request
                await delay(1000 / rate_limit); // Enforce rate limit per request
            })
        );
    }

    isProcessingQueue = false;
};

const get = async <T>(apiPath: string): Promise<T | null> => {
    const now = Date.now();
    const cacheFile = path.resolve(cacheDir, encodeURIComponent(apiPath) + '.json');

    // Check if the response is already cached
    if (cacheEnabled && fs.existsSync(cacheFile)) {
        const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));

        // Check if the cache has expired
        if (now - cachedData.timestamp < CACHE_TTL) {
            return cachedData.data; // Return cached data if it's still valid
        }

        // Cache is expired. No need to delete it, as it will be updated on the next request
    }

    // If not cached or expired, add the request to the queue
    return new Promise((resolve, reject) => {
        requestQueue.push(async () => {
            try {
                const response = await ofetch(joinURL(kiesmbo.baseUrl, apiPath), {
                    headers: {
                        'Ocp-Apim-Subscription-Key': apiPath.includes('/v2') ? kiesmbo.tokenV2 : kiesmbo.tokenV1,
                    }
                });

                console.log(`Fetched data from KiesMBO API: ${apiPath}`);
        
                // Cache the response to a file
                if (cacheEnabled && response && !response.HasError) {
                    const cacheContent = {
                        timestamp: now,
                        data: response
                    };
                    fs.writeFileSync(cacheFile, JSON.stringify(cacheContent, null, 2));
                }

                resolve(response as T);
            } catch (err) {
                console.log('Error fetching data from Hovi in: ' + apiPath);
                console.error(err);
                reject(err);
            }
        });

        // Start processing the queue
        processQueue();
    });
}


function findMainLocation (locations: Array<MLocation & { studies: MProduct[] }>): string | null {
    if (!locations || !locations[0]) return null;
    return locations.reduce((maxLoc, loc) => {
        const studiesCount = Array.isArray(loc.studies) ? loc.studies.length : 0;
        const maxStudiesCount = Array.isArray(maxLoc.studies) ? maxLoc.studies.length : 0;
        return studiesCount > maxStudiesCount ? loc : maxLoc;
    }, locations[0]).brinvest || '';
}


// Fetch organization details
export async function fetchData(options: {
    filterByCreboCodes: boolean,
    creboCodes: string[],
    filterByStudyNumbers: boolean,
    studyNumbers: string[],
}) {
    const { filterByCreboCodes, creboCodes, filterByStudyNumbers, studyNumbers } = options;

    const data = await safeAsync(async () => {
        const exportData = await get<Export>('/v2/export');
        const studyData = await get<StudiesExport>('/v1/studies').then(async (res) => {
            if (!res) return null

            // Only fetch details for studies that match the filter criteria
            const filteredData = res.Data.filter((study) => {
                if (filterByCreboCodes && !!creboCodes.length && !creboCodes.includes(study.Crebo)) return false
                if (filterByStudyNumbers && !!studyNumbers.length && !studyNumbers.includes(study.StudyNumber)) return false
                return true
            });

            // Fetch details for each study in the filtered data
            const data = await Promise.all(filteredData.map(async (study) => {
                const details = await get<{ Data: StudyDetails}>(`/v1/studies/${study.StudyNumber}`);
                if (!details) return null
                return {
                    ...study,
                    ...details.Data
                }
            }))

            // Filter out any null values from the fetched details
            return data.filter((item) => item !== null);
        });

        if (!exportData || !studyData) {
            throw new Error('Failed to fetch data from KiesMBO API');
        }


        const organizations: MOrganizationExtended[] = []
        const locations: MLocationExtended[] = []
        const products: MProductExtended[] = []

        exportData.schools.forEach((org) => {
            if (!org.brin || !org.name) return
            const { locations: locs, ...rest } = org;
            const location_ids: string[] = []
            let main_location = locs.find(loc => loc.isMainLocation)?.brinvest || findMainLocation(locs)
            const product_ids: string[] = []

            locs.forEach((location) => {
                const { studies, opendays, ...restLocation } = location;
                if (!restLocation.brinvest) return
                const location_id = restLocation.brinvest;

                // A variable to track if the location has active products
                let isActiveLocation = false;

                studies.forEach((product) => {
                    // Check if the product matches crebo filter criteria
                    if (!product.crebo || (filterByCreboCodes && !!creboCodes.length && creboCodes.includes(product.crebo))) return
                    
                    // Find the corresponding study in the studyData
                    const study = studyData.find((study) => study.Crebo === product.crebo);
                    // If no study is found, this means the study was filtered based on the filterByStudyNumbers criteria, 
                    // so skip this product
                    if (!study) return

                    // Create a unique product ID and add it to the product_ids array
                    const product_id  = `${product.crebo}_${org.brin}_${location_id}`;
                    if (!product_ids.includes(product_id)) product_ids.push(product_id);
                    
                    const index = products.findIndex((p) => p.product_id === product_id);

                    // add product (if the id is not already present)
                    if (index === -1) {
                        // If the product doesn't exist, create a new one
                        products.push({
                            ...product,
                            learningPaths: product.learningPaths.filter(Boolean),
                            product_id: product_id,
                            location_id,
                            organization_id: org.brin as string,
                            name: study.Name,
                            studyNumber: study.StudyNumber,
                            crebo: study.Crebo,
                            intro: study.Intro,
                            urlKiesMbo: study.Url,
                            interests: study.Interests,
                            workplaces: study.Workplaces,
                            talents: study.Talents,
                            images: study.Images,
                            profile: study.Profile,
                        });
                    }
                    
                    isActiveLocation = true; // Mark the location as having active products
                });

                if (!isActiveLocation) return // Skip if no active products

                if (!location_ids.includes(location_id)) location_ids.push(location_id);
                const index = locations.findIndex((l) => l.location_id === location_id);

                // If the location already exists, merge it with the new data
                if (index !== -1) {
                    locations[index] = defu(
                        locations[index],
                        {
                            ...restLocation,
                            location_id: location_id,
                            organization_id: org.brin
                        }
                    )
                } else {
                    // If the location doesn't exist, create a new one
                    locations.push({
                        ...restLocation,
                        location_id: location_id,
                        organization_id: org.brin
                    });
                }
                
            })

            // Only add the organization if there are associated products
            if (!!product_ids.length) {
                organizations.push({
                    ...rest,
                    main_location,
                    location_ids: location_ids,
                    product_ids: product_ids,
                    organization_id: org.brin as string,
                });
            }
        })

        return {
            organizations,
            products,
            locations,
        };
    }, { method: 'fetchData', vendor: 'kiesmbo'  });

    if (!data) {
        return {
            organizations: [],
            products: [],
            locations: [],
        }
    }
    return data
}
