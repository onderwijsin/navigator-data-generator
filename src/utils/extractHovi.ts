import dotenv from 'dotenv';
import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import type { paths } from "../types/hovi";
import type { HOrganizationList } from "../types/hovi.short";
import type { Vendor } from "../types/utils";
import { joinURL } from "ufo";
import type {
    HOrganization,
    HProductIds,
    HLocationIds,
    HLocation,
    HProduct,
    HProductList,
    HDegrees
} from '../types/hovi.short'

dotenv.config();
const { hovi } = useConfig();

const rate_limit = hovi.rateLimit || 20; // Rate limit for Hovi API requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const cacheEnabled = process.env.ENABLE_CACHE === 'true'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0') // Cache TTL in milliseconds

import * as fs from 'fs';
import * as path from 'path';
const cacheDir = path.resolve(process.cwd(), '.cache/hovi'); // Cache directory
if (cacheEnabled && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

// Create a queue to manage rate-limited requests
const requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const processQueue = async () => {
    if (isProcessingQueue) return; // Prevent multiple queue processors
    isProcessingQueue = true;

    while (requestQueue.length > 0) {
        const nextRequest = requestQueue.shift(); // Get the next request
        if (nextRequest) {
            await nextRequest(); // Execute the request
            await delay(1000 / rate_limit); // Enforce rate limit
        }
    }

    isProcessingQueue = false;
};

// Function to fetch data from the Hovi API
const get = async (apiPath: string): Promise<any> => {
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
                const response = await ofetch(joinURL(hovi.baseUrl, apiPath), {
                    headers: {
                        Authorization: 'Bearer ' + hovi.token
                    }
                });

                console.log(`Fetched data from Hovi API: ${apiPath}`);

                // Cache the response to a file
                if (cacheEnabled) {
                    const cacheContent = {
                        timestamp: now,
                        data: response
                    };
                    fs.writeFileSync(cacheFile, JSON.stringify(cacheContent, null, 2));
                }

                resolve(response);
            } catch (err) {
                console.log('Error fetching data from Hovi in: ' + apiPath);
                console.error(err);
                reject(err);
            }
        });

        // Start processing the queue
        processQueue();
    });
};

// Type helpers. Mostly shorthands
type OrganizationList = {
    organizationId: string;
    brin: string;
    shortCode?: string
    brinName?: string
}[]




// Fetch degrees
export async function fetchDegrees(): Promise<HDegrees> {
    const response: HDegrees = await get('/domain/degree');
    if (!response) {
        throw new Error('Failed to fetch degrees');
    }
    return response;
}

// Fetch organization IDs
export async function fetchOrganizationIds(): Promise<OrganizationList> {
    const response: paths['/organization']['get']['responses']['200']['content']['application/json'] = await get('/organization');
    if (!response) {
        throw new Error('Failed to fetch organization IDs');
    }   
    const list = response.filter(org => !!org.brin && !!org.organizationId) as OrganizationList;
    return list
}


// Fetch organization details
export async function fetchOrganizationDetails(
    organizationId: string,
): Promise<HOrganizationList[number] | null> {
    try {
            const organization: HOrganization = await get(`/organization/${organizationId}`);
            // const { brin, brinName, description, organizationType, shortCode, phone, email, webLink } = organization;
    
            // Fetch product and location IDs for the organization
            const productIds: HProductIds = await get(`/organization/${organizationId}/product`);
            const locationIds: HLocationIds = await get(`/organization/${organizationId}/location`);
    
            // Fetch locations
            const locations = await Promise.all(locationIds.map(async ({ locationId }): Promise<HLocation> => {
                const location: HLocation = await get(`/organization/${organizationId}/location/${locationId}`);
                return location
            }));

    
            // Transform products and associate them with locations
            const products = await Promise.all(productIds.map(async ({ productId }): Promise<HProduct> => {
                const product: HProduct = await get(`/organization/${organizationId}/product/${productId}`);
                return product
            }));
    
            /**
             * Calculate the most used location by the products of each organization.
             * @param products - Array of products with location data.
             * @returns The most used location.
             */
            function getMostUsedLocation(products: HProductList): string | null {
                const locationCount: { [key: string]: number } = {};
    
                products.forEach(product => {
                    if (product.location) {
                        const locationKey = product.location
                        if (locationCount[locationKey]) {
                            locationCount[locationKey]++;
                        } else {
                            locationCount[locationKey] = 1;
                        }
                    }
                });
    
                let mostUsedLocation: string | null = null;
                let maxCount = 0;
    
                for (const key in locationCount) {
                    const entry = locationCount[key];
                    if (typeof entry === 'number' && entry > maxCount) {
                        maxCount = entry;
                        mostUsedLocation = key;
                    }
                }
    
                return mostUsedLocation;
            }
    
            return {
                organization: {
                    ...organization,
                    vendor: 'hovi' satisfies Vendor,
                    mainLocation: getMostUsedLocation(products),
                },
                products,
                locations,
            };
        } catch (err) {
            console.log(`Error processing organizationId ${organizationId}:`);
            console.error(err);
            return null;
        }
}