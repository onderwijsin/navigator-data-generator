import dotenv from 'dotenv';
import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import type { Export, MOrganizationExtended, MLocationExtended, MProductExtended } from "../types/kiesmbo.short";
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

const get = async (): Promise<Export | null> => {
    const now = Date.now();
    const cacheFile = path.resolve(cacheDir, 'export_v2.json');

    // Check if the response is already cached
    if (cacheEnabled && fs.existsSync(cacheFile)) {
        const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));

        // Check if the cache has expired
        if (now - cachedData.timestamp < CACHE_TTL) {
            return cachedData.data; // Return cached data if it's still valid
        }

        // Cache is expired. No need to delete it, as it will be updated on the next request
    }

    try {
        const response: Export = await ofetch(joinURL(kiesmbo.baseUrl, '/export'), {
            headers: {
                'Ocp-Apim-Subscription-Key': kiesmbo.token,
            }
        });

        // Cache the response to a file
        if (cacheEnabled) {
            const cacheContent = {
                timestamp: now,
                data: response
            };
            fs.writeFileSync(cacheFile, JSON.stringify(cacheContent, null, 2));
        }

        return response
    } catch (err) {
        console.log('Error fetching export from KiesMBO api');
        console.error(err);
        return null
    }
}



// Fetch organization details
export async function fetchData() {
    return safeAsync(async () => {
        const data = await get();
        if (!data) {
            throw new Error('Failed to fetch data from KiesMBO API');
        }


        const organizations: MOrganizationExtended[] = []
        const locations: MLocationExtended[] = []
        const products: MProductExtended[] = []

        data.schools.forEach((org) => {
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
                    products.push({
                        ...product,
                        product_id: product_id,
                        location_ids: [location_id],
                        organization_id: org.brin as string,
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