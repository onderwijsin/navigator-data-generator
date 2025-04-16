import dotenv from 'dotenv';
import { useConfig } from "../composables/use-config";
import { ofetch } from "ofetch";
import type { Location } from '../types';
import type { GeocodeResponse } from '../types/geolocation';
const cacheEnabled = process.env.ENABLE_CACHE === 'true'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0') // Cache TTL in milliseconds
dotenv.config();
const { google } = useConfig();

import * as fs from 'fs';
import * as path from 'path';
const cacheDir = path.resolve(process.cwd(), '.cache/google'); // Cache directory
if (cacheEnabled && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

const sampleResponse: GeocodeResponse = {
    status: "OK",
    results: [
        {
            address_components: [
                {
                    long_name: "1600",
                    short_name: "1600",
                    types: ["street_number"]
                },
                {
                    long_name: "Amphitheatre Parkway",
                    short_name: "Amphitheatre Pkwy",
                    types: ["route"]
                },
                {
                    long_name: "Mountain View",
                    short_name: "Mountain View",
                    types: ["locality", "political"]
                },
                {
                    long_name: "Santa Clara County",
                    short_name: "Santa Clara County",
                    types: ["administrative_area_level_2", "political"]
                },
                {
                    long_name: "California",
                    short_name: "CA",
                    types: ["administrative_area_level_1", "political"]
                },
                {
                    long_name: "United States",
                    short_name: "US",
                    types: ["country", "political"]
                },
                {
                    long_name: "94043",
                    short_name: "94043",
                    types: ["postal_code"]
                }
            ],
            formatted_address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
            geometry: {
                location: {
                    lat: 37.4224764,
                    lng: -122.0842499
                },
                location_type: "ROOFTOP",
                viewport: {
                    northeast: {
                        lat: 37.4238253802915,
                        lng: -122.0829009197085
                    },
                    southwest: {
                        lat: 37.4211274197085,
                        lng: -122.0855988802915
                    }
                }
            },
            place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
            plus_code: {
                compound_code: "CWC8+W5 Mountain View, California, USA",
                global_code: "849VCWC8+W5"
            },
            types: ["street_address"]
        }
    ]
}


// Function to fetch data from the Hovi API
const get = async (address: string): Promise<any> => {
    if (google.useDummyData) return sampleResponse
    const now = Date.now();
    const cacheFile = path.resolve(cacheDir, encodeURIComponent(address) + '.json');

    // Check if the response is already cached
    if (cacheEnabled && fs.existsSync(cacheFile)) {
        const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));

        // Check if the cache has expired
        if (now - cachedData.timestamp < CACHE_TTL) {
            return cachedData.data; // Return cached data if it's still valid
        }

        // Cache is expired. No need to delete it, as it will be updated on the next request
    }

    const data: GeocodeResponse = await ofetch('https://maps.googleapis.com/maps/api/geocode/json', {
        query: {
            address,
            key: google.apiKey
        }
    })

    console.log(`Fetched data from Google API: ${address}`);

    // Cache the response to a file
    if (cacheEnabled) {
        const cacheContent = {
            timestamp: now,
            data
        };
        fs.writeFileSync(cacheFile, JSON.stringify(cacheContent, null, 2));
    }

    return data
};



function transformPlace(input: GeocodeResponse) {
    const result = input.results[0];
    if (!result) return null
    const country = result.address_components.find(component => component.types.includes("country"))?.short_name || "";
    const postalCode = result.address_components.find(component => component.types.includes("postal_code"))?.short_name || "";
    const administrativeArea = result.address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name || "";

    const raw = result.address_components.map(component => ({
        longText: component.long_name,
        shortText: component.short_name,
        types: component.types
    }));

    const displayName = `${result.address_components[0]?.long_name}`;
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

export const getAddress = (item: Location) => {
    const { street, zip, city, country } = item;
    let addressParts: string[] = [];

    if (street) addressParts.push(street);
    if (zip) addressParts.push(zip);
    if (city) addressParts.push(city);
    if (country) addressParts.push(country);

    return addressParts.length ? addressParts.join(', ') : null;
};

export const fetchLocationComponents = async (loc: Location) => {
    const address = getAddress(loc);
    if (!address) return null
    try {
        const data = await get(address)

        if (data?.status !== 'OK') {
            throw new Error('Could not fetch geocode data from Google Maps API')
        }
        if (!data?.results[0]) {
            throw new Error('Could not fetch geocode data from Google Maps API. Please check the validity of the provided address')
        }
        return transformPlace(data);
    } catch (error) {
        console.error('Error fetching geocode data for location:', loc.hovi_id);
        console.error(error);
        return null;
    }
}

/**
 * Enhances a location object with geolocation data, including address components
 * and geographical coordinates.
 *
 * @param location - The location object to enhance with geolocation data.
 * @returns A promise that resolves to the enhanced location object, including:
 * - `location_address`: The formatted address of the location.
 * - `location_components`: Detailed address components fetched from geolocation services.
 * - `location_data`: Geographical data in GeoJSON format, including coordinates.
 * - All original properties of the input location.
 *
 * @example
 * const location = {
 *   hovi_id: "123",
 *   name: "Example Location",
 *   street: "Main Street 1",
 *   zip: "12345",
 *   city: "Example City",
 *   country: "Netherlands",
 *   vendor: "hovi"
 * };
 *
 * const enhancedLocation = await addGeoDataToLocation(location);
 * console.log(enhancedLocation.location_data.coordinates); // [longitude, latitude]
 */
export const addGeoDataToLocation = async (location: Location) => {
    const components = await (fetchLocationComponents(location))
    return {
        "location_address": getAddress(location),
        "location_components": components,
        "location_data": !!components ? {
            type: "Point",
            coordinates: components?.geometry.coordinates
        } : null,
        ...location
    }
}