
import dotenv from 'dotenv';import type { Product, ProductForm, Organization, LocationWithGeoData } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createDirectus, rest, withToken, createItems } from '@directus/sdk';
import { ofetch } from 'ofetch';
// Load environment variables from .env file
dotenv.config();
const hovi_token = process.env.HOVI_TOKEN as string;

const rate_limit = 20;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch data from the Hovi API
const get = async (path: string) => {
    try {
        await delay(1000 / rate_limit); // Delay to adhere to rate limit
        return await ofetch('https://api.hovi.nl/api/3' + path, {
            headers: {
                Authorization: 'Bearer ' + hovi_token
            }
        })
    } catch (err) {
        console.log(err);
        console.log('error in: ' + path);
    }
};

const token = process.env.DIRECTUS_TOKEN as string;
const client = createDirectus('https://datahub.onderwijs.in').with(rest());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Read all files from the output folder
const hoviOrganizations: Organization[] = [];
const mboOrganizations: Organization[] = [];

const directoryPathHoviOrgs = path.join(__dirname, '../output/hovi/organizations');
const filesHOVI = fs.readdirSync(directoryPathHoviOrgs);

const directoryPathMboOrgs = path.join(__dirname, '../output/kiesmbo/organizations');
const filesMBO = fs.readdirSync(directoryPathMboOrgs);

filesHOVI.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(directoryPathHoviOrgs, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const organization: Organization = JSON.parse(rawData);
        hoviOrganizations.push(organization);
    }
});

filesMBO.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(directoryPathMboOrgs, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const organization: Organization = JSON.parse(rawData);
        mboOrganizations.push(organization);
    }
});


// Assemble all data into variables
const locationsMBO = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/kiesmbo/locations/locations_with_geodata.json'), 'utf-8'))
const locationsHOVI = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/hovi/locations/locations_with_geodata.json'), 'utf-8'))
const locations: LocationWithGeoData[] = [...locationsMBO, ...locationsHOVI];

// These are locations without coordinates. There are also locations with missing lcoation data (such as street names), but that DO have coords.
const dirtyLocations = locations.filter(loc => !loc.location_data || !loc.location_data.coordinates.every(coord => typeof coord === 'number'))

// Write files fro redundancy
fs.writeFileSync(path.resolve(__dirname, '../output/datahub/dirty_locations.json'), JSON.stringify(dirtyLocations, null, 2));
fs.writeFileSync(path.resolve(__dirname, '../output/datahub/locations.json'), JSON.stringify(locations, null, 2));


// Helper function for batching requests
function batchArray<T>(data: T[], batchSize: number): T[][] {
    const batchedArray: T[][] = [];
    for (let i = 0; i < data.length; i += batchSize) {
        batchedArray.push(data.slice(i, i + batchSize));
    }
    return batchedArray;
}

/*
1. First: create locations in directus
    - manipulate the location data to fit the directus schema
    - Batch requests to 50 locations at a time
2. Save the response, we'll need that later
3. Fetch location - organization relation from HOVI
    Not all locations are used by a product, so we'll need to map relations another way
4. Create organizations in directus
    - Map the main_location.id from step 2
    - Map the locations by location.id from step 2
    - Batch requests to 50 organizations at a time
*/


/* STEP 1 and STEP 2 */
const locationsForDirectus = locations.map((loc: LocationWithGeoData) => {
    const { name, street, zip, city, country, url, vestiging_SK123_id, ...rest } = loc;

    return {
        ...rest,
        title: name,
        website: url?.trim() || null,
        vestiging_sk123_id: vestiging_SK123_id,
        status: 'active'
    }
})


const batchedLocations = batchArray(locationsForDirectus, 50);

const locationData: Array<LocationWithGeoData & { 
    id: string 
    // theres more props, but these are irrelevant for this script
}> = []

let h = 0
for await (const batch of batchedLocations) {
    const response = await client.request(withToken(token, createItems('educational_locations', batch)));

    if (!!response.length) {
        locationData.push(...response as Array<LocationWithGeoData & { 
            id: string 
        }>);
    } else {
        console.log('Error creating locations', response);
        console.log('Batch:', h);
    }
    h++
}

fs.writeFileSync(path.resolve(__dirname, '../output/datahub/locations_with_directus_ids.json'), JSON.stringify(locationData, null, 2));


/* STEP 3 */

const directusLocations: Array<LocationWithGeoData & { 
    id: string 
    // theres more props, but these are irrelevant for this script
}> = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/datahub/locations_with_directus_ids.json'), 'utf-8'))

import type { paths } from '../hovi';
const organizationIds: paths['/organization']['get']['responses']['200']['content']['application/json'] = await get('/organization');

const organizations = await Promise.all(organizationIds.map(async ({ organizationId }) => {
    try {

        // Fetch location IDs for the organization
        const locationIds: paths['/organization/{organizationId}/location']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}/location`);


        return {
            hoviOrg: organizationId,
            locationIds: locationIds.map(({ locationId }) => locationId)
        };
    } catch (err) {
        console.log(`Error processing organizationId ${organizationId}:`, err);
        return null;
    }
}));


/* STEP 4 */

const hoviOrganizationsForDirectus = hoviOrganizations.map((org: Organization) => {
    const { products, main_location, logoUrl, locations, ...rest } = org;

    const location_ids = organizations.find(o => o?.hoviOrg === org.hovi_id)?.locationIds || []
    const uniqueLocationIds = Array.from(new Set(location_ids));


    const location_payload = uniqueLocationIds.map(id => { 
        const loc = directusLocations.find(loc => loc.hovi_id === id)
        if (!loc) return null
        return {
            educational_locations_id: loc?.id
        }
    }).filter(Boolean)

    const main = directusLocations.find(loc => loc.hovi_id === main_location?.hovi_id)
    const main_location_payload = !main ? {
        location_address: null,
        location_components: null,
        location_data: null,
    } : {
        location_address: main.location_address,
        location_components: main.location_components,
        location_data: main.location_data,
    }

    return {
        ...rest,
        sub_locations: location_payload,
        ...main_location_payload,
        status: 'active'
    }
})


const mboOrganizationsForDirectus = mboOrganizations.map((org: Organization) => {
    const { products, main_location, logoUrl, locations, ...rest } = org;

    const uniqueLocationIds = Array.from(new Set(locations));

    const location_payload = uniqueLocationIds.map(id => { 
        const loc = directusLocations.find(loc => loc.brinvest === id)
        if (!loc) return null
        return {
            educational_locations_id: loc?.id
        }
    }).filter(Boolean)

    const main = directusLocations.find(loc => loc.brinvest === main_location?.brinvest)
    const main_location_payload = !main ? {
        location_address: null,
        location_components: null,
        location_data: null,
    } : {
        location_address: main.location_address,
        location_components: main.location_components,
        location_data: main.location_data,
    }

    return {
        ...rest,
        sub_locations: location_payload,
        ...main_location_payload,
        status: 'active'
    }
})


const batchedHoviOrgs = batchArray(hoviOrganizationsForDirectus, 20);
const batchedMboOrgs = batchArray(mboOrganizationsForDirectus, 20);


const hoviOrgData: Array<Organization & { 
    id: string 
    // theres more props, but these are irrelevant for this script
}> = []

const mboOrgData: Array<Organization & { 
    id: string 
    // theres more props, but these are irrelevant for this script
}> = []

let i = 0
for await (const batch of batchedHoviOrgs) {
    const response = await client.request(withToken(token, createItems('educational_institutions', batch)));

    if (!!response.length) {
        hoviOrgData.push(...response as Array<Organization & { 
            id: string 
        }>);
    } else {
        console.log('Error creating hovi orgs', response);
        console.log('Batch:', i);
    }
    i++
}

fs.writeFileSync(path.resolve(__dirname, '../output/datahub/hovi/organizations_with_directus_ids.json'), JSON.stringify(hoviOrgData, null, 2));


let j = 0
for await (const batch of batchedMboOrgs) {
    const response = await client.request(withToken(token, createItems('educational_institutions', batch)));

    if (!!response.length) {
        mboOrgData.push(...response as Array<Organization & { 
            id: string 
        }>);
    } else {
        console.log('Error creating mbo orgs', response);
        console.log('Batch:', j);
    }
    j++
}

fs.writeFileSync(path.resolve(__dirname, '../output/datahub/kiesmbo/organizations_with_directus_ids.json'), JSON.stringify(mboOrgData, null, 2));


