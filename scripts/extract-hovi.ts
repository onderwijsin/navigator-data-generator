import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import dotenv from 'dotenv';
import fs from 'fs';
import { degrees } from '../static/degrees';
import type { Product, ProductForm, Organization, Location } from '../types';
import {ofetch} from 'ofetch'
import type { paths } from '../hovi';

// Load environment variables from .env file
dotenv.config();
const token = process.env.HOVI_TOKEN as string;

const rate_limit = 20;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch data from the Hovi API
const get = async (path: string) => {
    try {
        await delay(1000 / rate_limit); // Delay to adhere to rate limit
        return await ofetch('https://api.hovi.nl/api/3' + path, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => res.json());
    } catch (err) {
        console.log(err);
        console.log('error in: ' + path);
    }
};

// Function to transform HoviProduct to Product
const transformHoviProductToProduct = (hoviProduct: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']): Product => {
    // Function to transform product form
    const transformProductForm = (form: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']['productForms'][number]): ProductForm => ({
        admission_description: form.admissionDescription?.nl ? generateJSON(`${form.admissionDescription.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        admission_selections: form?.admissionSelections || null,
        admission_tests: form.admissionTests?.map(test => ({
            ...test,
            description: test.description?.nl ? generateJSON(`${test.description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null
        })) || null,
        admission_url: form.admissionURL?.nl,
        instruction_mode_description: form.instructionModeDescription?.nl ? generateJSON(`${form.instructionModeDescription.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        instruction_modes: form.instructionModes || [],
        job_perspective: form.jobPerspective?.nl ? generateJSON(`${form.jobPerspective.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        lang_requirements_description: form.languageRequirements?.[0]?.description?.nl ? generateJSON(`${form.languageRequirements[0].description.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        lang_exam: form.languageRequirements?.[0]?.languageExam,
        lang_exam_minimum_score: form.languageRequirements?.[0]?.minimumScore,
        numerus_fixus: !!form.numerusFixus,
        numerus_fixus_capacity: form?.numerusFixus?.[0].capacity,
        numerus_fixus_tries: form.numerusFixus?.[0].numberOfTries,
        numerus_fixus_url: form.numerusFixus?.[0].numerusUrl?.nl,
        product_description: form.productDescription?.nl ? generateJSON(`${form.productDescription.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        product_description_en: form.productDescription?.en ? generateJSON(`${form.productDescription.en}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        product_result: form.productResult?.nl ? generateJSON(`${form.productResult.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        application_deadlines: form.productStarts?.map(start => ({
            application_deadline: start.applicationDeadlineNL || null,
            starting_date: start.startingDate || null,
            end_date: start.endDate || null
        })) || [],
        product_url: form.productURL?.nl,
        product_url_en: form.productURL?.en,
        scholarships: form.scholarships?.map(scholarship => scholarship?.scholarship || '').filter(r => !!r) || [],
        study_advices: form.studyAdvices,
        study_costs: form.studyCosts?.map(cost => ({
            ...cost,
            description: cost.description?.nl ? generateJSON(`${cost.description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null
        })),
        tracks: form.tracks,
        tuition_fees: form.tuitionFees?.map(fee => ({
            ...fee,
            description: fee.description?.nl ? generateJSON(`${fee.description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null
        })),
    });

    return {
        title: hoviProduct.productName?.nl || '',
        english_title: hoviProduct.productName?.en || null,
        product_type: hoviProduct.productType,
        product_level: hoviProduct.productLevel,
        croho: hoviProduct.croho,
        croho_name: hoviProduct.crohoName?.nl,
        degrees: hoviProduct.degrees?.map(degree => degrees.find(d => d.rowkey === degree)?.title.nl) as (typeof degrees[number]['title']['nl'])[] | undefined,
        croho_sector: hoviProduct.crohoSector,
        credits: hoviProduct.credits,
        financing: hoviProduct.financing,
        location_hovi_id: hoviProduct.location,
        organization_hovi_id: hoviProduct.organization,
        product_forms: hoviProduct.productForms?.map(transformProductForm) || []
    };
};

// Function to transform HoviLocation to Location
const transformHoviLocationToLocation = (hoviLocation: paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json']): Location => {
    const { locationId, locationName, visitorAddress, vestigingSK123Id, webLink } = hoviLocation;
    return {
        hovi_id: locationId || null,
        name: locationName?.nl || null,
        street: visitorAddress?.street && visitorAddress?.nr_detail ? `${visitorAddress?.street} ${visitorAddress?.nr_detail}` : visitorAddress?.street || null,
        zip: visitorAddress?.zip || null,
        city: visitorAddress?.city || null,
        country: visitorAddress?.country || null,
        vestiging_SK123_id: vestigingSK123Id,
        url: webLink?.nl || null
    };
};

// Fetch organization IDs
const organizationIds: paths['/organization']['get']['responses']['200']['content']['application/json'] = await get('/organization');

// Read existing files and filter out already processed organization IDs
const existingFiles = fs.readdirSync('../output/hovi');
const existingOrganizationIds = new Set(
    existingFiles
        .filter(file => file.startsWith('organization_') && file.endsWith('.json'))
        .map(file => file.replace('organization_', '').replace('.json', ''))
);

const filteredOrganizationIds = organizationIds.filter(({ organizationId }) => !!organizationId && !existingOrganizationIds.has(organizationId));

// Array to store all locations. After processing all organizations, this array will be used to fetch location data from Google Apis for each unique location
const globalLocations: Location[] = []

// Process each organization
const organizations = await Promise.all(filteredOrganizationIds.map(async ({ organizationId }) => {
    try {
        const organization: paths['/organization/{organizationId}']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}`);
        const { brin, brinName, description, organizationType, shortCode, phone, email, webLink } = organization;

        // Fetch product and location IDs for the organization
        const productIds: paths['/organization/{organizationId}/product']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}/product`);
        const locationIds: paths['/organization/{organizationId}/location']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}/location`);

        // Transform locations
        const locations = await Promise.all(locationIds.map(async ({ locationId }): Promise<Location> => {
            const location: paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}/location/${locationId}`);
            return transformHoviLocationToLocation(location);
        }));

        globalLocations.push(...locations);

        // Transform products and associate them with locations
        const products = await Promise.all(productIds.map(async ({ productId }): Promise<Product & { location: Location | null }> => {
            const product: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json'] = await get(`/organization/${organizationId}/product/${productId}`);
            const location = locations.find(location => location.hovi_id === product.location);
            return {
                ...transformHoviProductToProduct(product),
                location: location || null
            };
        }));

        // Create organization data object
        const data: Organization = {
            title: brinName?.nl || null,
            code: shortCode || null,
            description: description?.nl ? generateJSON(`${description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null,
            type: organizationType === 'university' ? 'universiteit' : organizationType === 'university_of_applied_sciences' ? 'hogeschool' : organizationType === 'international_education' ? 'internationaal onderwijs' : 'onderzoeksuniversiteit',
            brin_code: brin || null,
            hovi_id: organizationId || null,
            phone: phone || null,
            email: email || null,
            website: !!webLink ? Object.entries(webLink).map(([key, value]) => ({
                url: value,
                lang: key === 'nl' ? 'Nederlands' : key === 'en' ? 'Engels' : 'Overig'
            })) : null,
            english_title: brinName?.en || null,
            products
        };

        return data;
    } catch (err) {
        console.log(`Error processing organizationId ${organizationId}:`, err);
        return null;
    }
}));

// Create an array of unique locations based on id
const uniqueLocations = Array.from(new Map(globalLocations.map(location => [location.hovi_id, location])).values());

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
        "location_data": {
            type: "Point",
            coordinates: components?.geometry.coordinates
        },
        ...location
    }
}))

// Write unique locations to file
fs.writeFileSync('../output/hovi/locations/locations_with_geodata.json', JSON.stringify(locationData, null, 2));



// Write organization data to file
const validOrganizations = organizations.filter(org => org !== null);

// Map new locations to products
const organizationData = validOrganizations.map(org => {
    return {
        ...org,
        products: org.products.map(product => {
            return {
                ...product,
                location: product.location ? locationData.find(location => !!product.location && location.hovi_id === product.location.hovi_id) : null
            }
        })
    }
})


organizationData.forEach(org => {
    const filePath = `../output/hovi/organization_${org.hovi_id}.json`;
    fs.writeFileSync(filePath, JSON.stringify(org, null, 2));
})
