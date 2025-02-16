import type { Product, ProductForm, Organization, Location } from '../types';
import fs from 'fs';
import path from 'path';

const hoviOrganizations: Organization[] = [];

const directoryPath = path.join(__dirname, '../output/hovi');
const files = fs.readdirSync(directoryPath);

files.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(directoryPath, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const organization: Organization = JSON.parse(rawData);
        hoviOrganizations.push(organization);
    }
});

function getMostUsedLocation(products: Array<Product & { location: Location | null }>): Location | null {
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
        if (locationCount[key].count > maxCount) {
            maxCount = locationCount[key].count;
            mostUsedLocation = locationCount[key].location;
        }
    }

    return mostUsedLocation;
}


const sanitizedLocations: Location[] = []

const sanitizedOrganizations = hoviOrganizations.map(org => {

    const main_location = getMostUsedLocation(org.products);

    const locations = org.products.map(product => (product.location as Location));

    console.log(locations.filter(loc => !loc.hovi_id).length);

    const uniqueLocations = Array.from(new Map(locations.map(loc => [loc.hovi_id, loc])).values());

    sanitizedLocations.push(...uniqueLocations);

    const { products, ...rest } = org;

    return {
        ...rest,
        locations: uniqueLocations.map(location => location.hovi_id),
        main_location: main_location ? main_location.hovi_id : null
    }
})


const uniqueSanitizedLocations = Array.from(new Map(sanitizedLocations.map(loc => [loc.hovi_id, loc])).values());

console.log({
    sanitizedOrganizations: sanitizedOrganizations.length,
    uniqueSanitizedLocations: uniqueSanitizedLocations.length
})

fs.writeFileSync('../output/datahub/hovi/organizations.json', JSON.stringify(sanitizedOrganizations, null, 2));
fs.writeFileSync('../output/datahub/hovi/locations.json', JSON.stringify(uniqueSanitizedLocations, null, 2));

