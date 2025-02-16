import type { Product, ProductForm, Organization, Location } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const locationsMBO = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/kiesmbo/locations/locations_with_geodata.json'), 'utf-8'))
const locationsHOVI = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/hovi/locations/locations_with_geodata.json'), 'utf-8'))


console.log({
    hoviOrganizations: hoviOrganizations.length,
    mboOrganizations: mboOrganizations.length,
    totalOrganizations: hoviOrganizations.length + mboOrganizations.length,
    locationsMBO: locationsMBO.length,
    locationsHOVI: locationsHOVI.length,
    totalLocations: locationsMBO.length + locationsHOVI.length
})



// const sanitizedLocations: Location[] = []

// const sanitizedOrganizations = hoviOrganizations.map(org => {

//     const locations = org.products.map(product => (product.location as Location));

//     console.log(locations.filter(loc => !loc.hovi_id).length);

//     const uniqueLocations = Array.from(new Map(locations.map(loc => [loc.hovi_id, loc])).values());

//     sanitizedLocations.push(...uniqueLocations);

//     const { products, ...rest } = org;

//     return {
//         ...rest,
//         locations: uniqueLocations.map(location => location.hovi_id),
//     }
// })


// const uniqueSanitizedLocations = Array.from(new Map(sanitizedLocations.map(loc => [loc.hovi_id, loc])).values());

// console.log({
//     sanitizedOrganizations: sanitizedOrganizations.length,
//     uniqueSanitizedLocations: uniqueSanitizedLocations.length
// })

// fs.writeFileSync('../output/datahub/hovi/organizations.json', JSON.stringify(sanitizedOrganizations, null, 2));
// fs.writeFileSync('../output/datahub/hovi/locations.json', JSON.stringify(uniqueSanitizedLocations, null, 2));

