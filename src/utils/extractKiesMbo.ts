import dotenv from 'dotenv';
import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import type { Export, MOrganizationExtended, MLocationExtended, MProductExtended, StudiesExport, StudyDetails } from "../types/kiesmbo.short";
import type { Vendor } from "../types/utils";
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



// Fetch organization details
export async function fetchData() {
    return safeAsync(async () => {
        const exportData = await get<Export>('/v2/export');
        const studyData = await get<StudiesExport>('/v1/studies').then(async (res) => {
            if (!res) return null
            const data = await Promise.all(res.Data.map(async (study) => {
                const details = await get<{ Data: StudyDetails}>(`/v1/studies/${study.StudyNumber}`);
                if (!details) return null
                return {
                    ...study,
                    ...details.Data
                }
            }))
            return data.filter((item) => item !== null);
        });

        if (!exportData || !studyData) {
            throw new Error('Failed to fetch data from KiesMBO API');
        }


        const organizations: MOrganizationExtended[] = []
        const locations: MLocationExtended[] = []
        const products: MProductExtended[] = []

        exportData.schools.forEach((org) => {
            if (!org.brin) return
            const { locations: locs, ...rest } = org;
            const location_ids: string[] = []
            const product_ids: string[] = []

            locs.forEach((location) => {
                const { studies, opendays, ...restLocation } = location;
                if (!restLocation.brinvest) return
                const location_id = restLocation.brinvest;
                location_ids.push(location_id);
                locations.push({
                    ...restLocation,
                    location_id: location_id,
                    organization_ids: [org.brin as string],
                });

                studies.forEach((product) => {
                    if (!product.crebo) return
                    // Create a unique product ID and add it to the product_ids array
                    const product_id  = `${product.crebo}_${org.name ? slugify(org.name) : org.brin}`;
                    if (!product_ids.includes(product_id)) product_ids.push(product_id);
                    const study = studyData.find((study) => study.Crebo === product.crebo);
                    if (!study) return
                    // console.log({
                    //     ...product,
                    //     product_id: product_id,
                    //     location_ids: [location_id],
                    //     organization_id: org.brin as string,
                    //     name: study.Name,
                    //     studyNumber: study.StudyNumber,
                    //     crebo: study.Crebo,
                    //     intro: study.Intro,
                    //     urlKiesMbo: study.Url,
                    //     interests: study.Interests,
                    //     workplaces: study.Workplaces,
                    //     talents: study.Talents,
                    //     images: study.Images,
                    //     profile: study.Profile,
                    // })
                    products.push({
                        ...product,
                        product_id: product_id,
                        location_ids: [location_id],
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
                });
            })

            organizations.push({
                ...rest,
                location_ids: location_ids,
                product_ids: product_ids,
                organization_id: org.brin as string,
            });
        })


        // Remove duplicates from organizations, products, and locations
        const uniqueProducts: MProductExtended[] = []
        const uniqueLocations: MLocationExtended[] = []

        // Helper function to merge arrays and keep only unique values
        function mergeUniqueArrays(arr1: string[], arr2: string[]): string[] {
            return Array.from(new Set([...arr1, ...arr2]));
        }

        // Process products
        const productMap = new Map<string, MProductExtended>();
        for (const product of products) {
            if (productMap.has(product.product_id)) {
                const existingProduct = productMap.get(product.product_id)!;
                productMap.set(
                    product.product_id,
                    defu(product, {
                        ...existingProduct,
                        location_ids: mergeUniqueArrays(existingProduct.location_ids, product.location_ids),
                    })
                );
            } else {
                productMap.set(product.product_id, product);
            }
        }
        uniqueProducts.push(...productMap.values());

        // Process locations
        const locationMap = new Map<string, MLocationExtended>();
        for (const location of locations) {
            if (locationMap.has(location.location_id)) {
                const existingLocation = locationMap.get(location.location_id)!;
                locationMap.set(
                    location.location_id,
                    defu(location, {
                        ...existingLocation,
                        organization_ids: mergeUniqueArrays(existingLocation.organization_ids, location.organization_ids),
                    })
                );
            } else {
                locationMap.set(location.location_id, location);
            }
        }
        uniqueLocations.push(...locationMap.values());

        
       
        return {
            organizations,
            products: uniqueProducts,
            locations: uniqueLocations,
        };
    }, { method: 'fetchData', vendor: 'kiesmbo'  });
}
