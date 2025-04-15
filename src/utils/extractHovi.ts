import dotenv from 'dotenv';
import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import type { paths } from "../types/hovi";
import type { HOrganizationDetailsList } from "../types/hovi.short";
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
import { logger } from '../lib/use-errors';

dotenv.config();
const { hovi } = useConfig();

const rate_limit = hovi.rateLimit || 20; // Rate limit for Hovi API requests
const batch_size = hovi.batchSize || 20; // Batch size for Hovi API requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const cacheEnabled = process.env.ENABLE_CACHE === 'true'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0') // Cache TTL in milliseconds

import * as fs from 'fs';
import * as path from 'path';
const cacheDir = path.resolve(process.cwd(), '.cache/hovi'); // Cache directory
if (cacheEnabled && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

/**
 * A utility function to safely execute asynchronous operations with error handling.
 * Logs errors and returns `null` if the operation fails.
 *
 * @template T - The type of the value returned by the asynchronous operation.
 * @param fn - A function that returns a promise to execute.
 * @param logContext - An object containing context for logging errors.
 * @param logContext.method - The name of the method or operation being executed.
 * @param logContext.id - An optional identifier for the operation (e.g., an ID related to the operation).
 * @returns A promise that resolves to the result of the operation, or `null` if an error occurs.
 *
 * @example
 * const result = await safeAsync(() => fetchData(), { method: 'fetchData', id: '123' });
 * if (result) {
 *   console.log('Data fetched successfully:', result);
 * } else {
 *   console.log('Failed to fetch data.');
 * }
 */
async function safeAsync<T>(
    fn: () => Promise<T>,
    logContext: { method: string; id?: string }
): Promise<T | null> {
    try {
        return await fn();
    } catch (err) {
        logger.log(err as Error, logContext.method, logContext.id || 'unknown_id', 'hovi');
        return null;
    }
}

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

/**
 * Fetches data from the Hovi API with support for rate-limiting, batching, and caching.
 * If caching is enabled and the requested data is available and valid in the cache,
 * it will return the cached data. Otherwise, it will fetch the data from the API.
 *
 * @param apiPath - The API endpoint path to fetch data from.
 * @returns A promise that resolves to the fetched data or rejects if an error occurs.
 *
 * @example
 * // Fetch data from the Hovi API
 * const data = await get('/organization');
 * console.log(data);
 */
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


// Fetch degrees
export async function fetchDegrees(): Promise<HDegrees | null> {
    return safeAsync(
        () => get('/domain/degree'),
        { method: 'fetchDegrees' }
    );
}

// Fetch organization IDs
export async function fetchOrganizationIds(): Promise<OrganizationList | null> {
    return safeAsync(async () => {
        const response: paths['/organization']['get']['responses']['200']['content']['application/json'] = await get('/organization');
        return response.filter(org => !!org.brin && !!org.organizationId) as OrganizationList;
    }, { method: 'fetchOrganizationIds' });
}

// Fetch locations for organization by ID
async function fetchLocationsForOrganization(organizationId: string): Promise<HLocation[]> {
    const locationIds: HLocationIds = await safeAsync(
        () => get(`/organization/${organizationId}/location`),
        { method: 'fetchLocationsForOrganization:list', id: organizationId }
    ) || [];

    const locations = await Promise.all(
        locationIds.map(({ locationId }) =>
            safeAsync(
                () => get(`/organization/${organizationId}/location/${locationId}`),
                { method: 'fetchLocationsForOrganization:single', id: locationId }
            )
        )
    );

    // Return only non-null locations
    return locations.filter(location => !!location && location.locationId) as HLocation[];
}

// Fetch products for organization by ID
async function fetchProductsForOrganization(organizationId: string): Promise<HProduct[]> {
    const productIds: HProductIds = await safeAsync(
        () => get(`/organization/${organizationId}/product`),
        { method: 'fetchProductsForOrganization:list', id: organizationId }
    ) || [];

    const products = await Promise.all(
        productIds.map(({ productId }) =>
            safeAsync(
                () => get(`/organization/${organizationId}/product/${productId}`),
                { method: 'fetchProductsForOrganization:single', id: productId }
            )
        )
    );

    // Return only non-null products
    return products.filter(product => !!product && product.productId) as HProduct[];
}


// Fetch organization details
export async function fetchOrganizationDetails(
    organizationId: string,
): Promise<HOrganizationDetailsList[number] | null> {
    return safeAsync(async () => {
        const organization: HOrganization = await get(`/organization/${organizationId}`);

        // Fetch product and location for the organization
        const locations = await fetchLocationsForOrganization(organizationId);
        const products = await fetchProductsForOrganization(organizationId);

        return {
            organization: {
                ...organization,
                vendor: 'hovi' satisfies Vendor,
                mainLocation: getMostUsedLocation(products),
                locationIds: locations.map(location => location.locationId),
                productIds: products.map(product => product.productId),
            },
            products,
            locations,
        };
    }, { method: 'fetchOrganizationDetails', id: organizationId });
}