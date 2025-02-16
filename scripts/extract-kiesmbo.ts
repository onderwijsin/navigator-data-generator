import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import dotenv from 'dotenv';
import {ofetch} from 'ofetch'


import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import type { paths } from '../kiesmbo'

import type { Product, ProductForm, Organization, Location, GeoFields } from '../types';

// Load environment variables from .env file
dotenv.config();
const token = process.env.KIESMBO_TOKEN as string;

const response: paths['/api/v2/export']['get']['responses']['200']['content'] = await ofetch('https://gateway.s-bb.nl/kiesmbo/api/v2/export', {
    headers: {
        'Ocp-Apim-Subscription-Key': token,
    }
})

fs.writeFileSync(path.resolve(__dirname, '../output/kiesmbo/export/export_v2.json'), JSON.stringify(response, null, 2));

import { components } from '../kiesmbo';
const { schools } = response;

const globalLocations: Location[] = []

const organizations: Organization[] = (schools as Array<components['schemas']['school']>).map(school => {
    let main_location: Location | null = null;

    const brinvests: string[] = [] as string[]

    (school.locations as Array<components['schemas']['location']>).forEach(location => {
        if (location.brinvest) brinvests.push(location.brinvest)
        const data = {
            hovi_id: null,
            name: location.name || null,
            street: location.street ? location.street + ' ' + location.houseNumber : null,
            zip: location.zipCode || null,
            city: location.city || null,
            country: 'Nederland',
            url: location.website || null,
            vendor: 'kiesmbo',
            brinvest: location.brinvest || null,
            location_data: location.geoCoordinate  && location.geoCoordinate.latitude && location.geoCoordinate.longitude ? {
                type: "Point",
                coordinates: [location.geoCoordinate.longitude, location.geoCoordinate.latitude]
            } : null
        }

        globalLocations.push(data)

        if (location.isMainLocation) {
            main_location = data
        }
        
        const { studies } = location;

        // TODO map studies to Products
        // TODO map location to Products
    })

    return {
        title: school.name || null,
        code: school.name?.slice(0, 5).toUpperCase() || null,
        description: null,
        type: 'mbo',
        phone: null,
        email: null,
        website: school.website ? [{ url: school.website, lang: "Nederlands"}] : null,
        brin_code: school.brin || null,
        logoUrl: school.logoUrl || null,
        vendor: 'kiesmbo',
        hovi_id: null,
        main_location,
        locations: brinvests,
        // TODO map studies from locations
        products: []
    }
    
    
});



// Create an array of unique locations based on id
const uniqueLocations = Array.from(new Map(globalLocations.map(location => [location.brinvest, location])).values());

const apiKey = process.env.GOOGLE_API_KEY;

function transformPlace(input) {
    const result = input.results[0];
    const country = result.address_components.find(component => component.types.includes("country"))?.short_name || "";
    const postalCode = result.address_components.find(component => component.types.includes("postal_code"))?.short_name || "";
    const administrativeArea = result.address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name || "";
  
    const raw = result.address_components.map(component => ({
      longText: component.long_name,
      shortText: component.short_name,
      types: component.types
    }));
  
    const displayName = `${result.address_components[0].long_name}`;
    const formated = result.formatted_address;
  
    const viewport = {
      south: result.geometry.viewport.southwest.lat,
      west: result.geometry.viewport.southwest.lng,
      north: result.geometry.viewport.northeast.lat,
      east: result.geometry.viewport.northeast.lng
    };
  
    return {
      geometry: {
        coordinates: [result.geometry.location.lng, result.geometry.location.lat],
        type: "Point"
      },
      properties: {
        country: country,
        postalCode: postalCode,
        administrativeArea: administrativeArea,
        raw: raw,
        displayName: displayName,
        formated: formated,
        viewport: viewport
      },
      type: "Feature"
    };
}


const getAddress = (item: Location) => {
    const { street, zip, city, country } = item;
    let addressParts: string[] = [];

    if (street) addressParts.push(street);
    if (zip) addressParts.push(zip);
    if (city) addressParts.push(city);

    if (!addressParts.length) return null;
    if (country) addressParts.push(country);

    return addressParts.length ? addressParts.join(', ') : null;
};

const errors: Location[] = []

const fetchLocationComponents = async (loc: Location) => {
    const address = getAddress(loc);
    if (!address) return null
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
        errors.push(loc);
        console.log(`Geocoding API error for: ${loc.hovi_id}`);
        return null
    }

    return transformPlace(data);
}

const locationData = await Promise.all(uniqueLocations.map(async location => {
    const components = await (fetchLocationComponents(location))
    return {
        "location_address": getAddress(location),
        "location_components": components,
        ...location
    }
}))

// Write unique locations to file
fs.writeFileSync(path.resolve(__dirname, '../output/kiesmbo/locations/locations_with_geodata.json'), JSON.stringify(locationData, null, 2));

organizations.forEach(org => {
    fs.writeFileSync(path.resolve(__dirname, `../output/kiesmbo/organizations/organization_${org.brin_code}.json`), JSON.stringify(org, null, 2));
})