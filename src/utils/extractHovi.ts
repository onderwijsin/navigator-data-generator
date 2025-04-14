import dotenv from 'dotenv';
import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import type { paths } from "../types/hovi";
import type { Vendor } from "../types/utils";
import { joinURL } from "ufo";
import defu from "defu";

dotenv.config();
const { hovi } = useConfig();

const rate_limit = 50;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const cacheEnabled = process.env.ENABLE_CACHE === 'true'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0') // Cache TTL in milliseconds

import * as fs from 'fs';
import * as path from 'path';
const cacheDir = path.resolve(process.cwd(), '.cache/hovi'); // Cache directory
if (cacheEnabled && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}


// Function to fetch data from the Hovi API
const get = async (apiPath: string) => {
    try {
        const now = Date.now();
        const cacheFile = path.resolve(cacheDir, encodeURIComponent(apiPath) + '.json');

        // Check if the response is already cached
        if (cacheEnabled && fs.existsSync(cacheFile)) {
            console.log(`Cache hit for ${apiPath}`);
            const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));

            // Check if the cache has expired
            if (now - cachedData.timestamp < CACHE_TTL) {
                return cachedData.data; // Return cached data if it's still valid
            } else {
                console.log(`Cache expired for ${apiPath}`);
            }
        }
        
        // If not cached, fetch the data
        await delay(1000 / rate_limit); // Delay to adhere to rate limit
        const response = await ofetch(joinURL(hovi.baseUrl, apiPath), {
            headers: {
                Authorization: 'Bearer ' + hovi.token
            }
        });
        

        // Cache the response to a file
        if (cacheEnabled) {
            // Cache the response to a file with a timestamp
            const cacheContent = {
                timestamp: now,
                data: response
            };
            fs.writeFileSync(cacheFile, JSON.stringify(cacheContent, null, 2));
        }

        return response;
    } catch (err) {
        console.log('error fetching data from hovi in: ' + path);
        console.error(err);
    }
};

// Type helpers. Mostly shorthands
type OrganizationList = {
    organizationId: string;
    brin: string;
    shortCode?: string
    brinName?: string
}[]

type Organization = paths['/organization/{organizationId}']['get']['responses']['200']['content']['application/json']
type ProductIds = paths['/organization/{organizationId}/product']['get']['responses']['200']['content']['application/json']
type LocationIds = paths['/organization/{organizationId}/location']['get']['responses']['200']['content']['application/json']
type Location = paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json']
type Product = paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']
type ProductWithLocation = Omit<Product, 'location'> & { location: Location | null }
type ProductList = Array<ProductWithLocation>


/**  
 * Array to store all unique locations. 
 * After processing all organizations, this array will be used to fetch location data from Google Apis for each unique location
 * 
 */
const globalLocations: Location[] = []


// Fetch degrees
async function fetchDegrees(): Promise<paths['/domain/degree']['get']['responses']['200']['content']['application/json']> {
    const response: paths['/domain/degree']['get']['responses']['200']['content']['application/json'] = await get('/domain/degree');
    if (!response) {
        throw new Error('Failed to fetch degrees');
    }
    return response;
}

// Fetch organization IDs
async function fetchOrganizationIds(): Promise<OrganizationList> {
    const response: paths['/organization']['get']['responses']['200']['content']['application/json'] = await get('/organization');
    if (!response) {
        throw new Error('Failed to fetch organization IDs');
    }   
    const list = response.filter(org => !!org.brin && !!org.organizationId) as OrganizationList;
    return list
}


// Fetch organization details
async function fetchOrganizationDetails(
    organizationId: string
): Promise<{
    organization: Organization & {
        vendor: Vendor
        mainLocation: Location['locationId'] | null
    },
    products: ProductList,
    locations: Location[]
} | null> {
    try {
            const organization: Organization = await get(`/organization/${organizationId}`);
            // const { brin, brinName, description, organizationType, shortCode, phone, email, webLink } = organization;
    
            // Fetch product and location IDs for the organization
            const productIds: ProductIds = await get(`/organization/${organizationId}/product`);
            const locationIds: LocationIds = await get(`/organization/${organizationId}/location`);
    
            // Fetch locations and add them to the global locations array
            const locations = await Promise.all(locationIds.map(async ({ locationId }): Promise<Location> => {
                const location: Location = await get(`/organization/${organizationId}/location/${locationId}`);
                
                // Add locations to global locations array, or merge with existing entries
                const index = globalLocations.findIndex(loc => loc.locationId === location.locationId);
                if (index === -1) {
                    globalLocations.push(location);
                } else {
                    globalLocations[index] = defu(globalLocations[index], location );
                }

                return location
            }));

    
            // Transform products and associate them with locations
            const products = await Promise.all(productIds.map(async ({ productId }): Promise<ProductWithLocation> => {
                const product: Product = await get(`/organization/${organizationId}/product/${productId}`);
                const location = locations.find(location => location.locationId === product.location) || null
                return {
                    ...product,
                    location
                };
            }));
    
            /**
             * Calculate the most used location by the products of each organization.
             * @param products - Array of products with location data.
             * @returns The most used location.
             */
            function getMostUsedLocation(products: ProductList): Location | null {
                const locationCount: { [key: string]: { location: Location, count: number } } = {};
    
                products.forEach(product => {
                    if (product.location) {
                        const locationKey = JSON.stringify(product.location);
                        if (locationCount[locationKey]) {
                            locationCount[locationKey].count++;
                        } else {
                            locationCount[locationKey] = { location: product.location, count: 1 };
                        }
                    }
                });
    
                let mostUsedLocation: Location | null = null;
                let maxCount = 0;
    
                for (const key in locationCount) {
                    const entry = locationCount[key];
                    if (entry && entry.count > maxCount) {
                        maxCount = entry.count;
                        mostUsedLocation = entry.location;
                    }
                }
    
                return mostUsedLocation;
            }
    
            return {
                organization: {
                    ...organization,
                    vendor: 'hovi' satisfies Vendor,
                    mainLocation: getMostUsedLocation(products)?.locationId,
                },
                products,
                locations,
            };
        } catch (err) {
            console.log(`Error processing organizationId ${organizationId}:`, err);
            return null;
        }
}


export const useRawHoviData = async () => {
    const ids = await fetchOrganizationIds();
    const testIds = ids.slice(0, 1);
    const organizations = await Promise.all(testIds.map(async ({ organizationId, brin, shortCode, brinName }) => {
        const data = await fetchOrganizationDetails(organizationId);
        console.log(`Fetched data for organizationId ${organizationId}`);
        return data;
    }));

    const notNullOrganizations = organizations.filter(org => org !== null)

    const degrees = await fetchDegrees()

    return {
        organizations: notNullOrganizations,
        products: notNullOrganizations.flatMap(org => org?.products || []),
        locations: globalLocations,
        degrees
    }
}