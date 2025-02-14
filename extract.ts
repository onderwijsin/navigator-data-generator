import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import dotenv from 'dotenv';
import fs from 'fs';
import { degrees } from './degrees';
import type { Product, ProductForm, HoviProduct, HoviOrganization, Organization, HoviLocation, Location, OrganizationIds, LocationIds, ProductIds } from './types';

// Load environment variables from .env file
dotenv.config();
const token = process.env.HOVI_TOKEN;

const rate_limit = 20;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch data from the Hovi API
const get = async (path: string) => {
    try {
        await delay(1000 / rate_limit); // Delay to adhere to rate limit
        return await fetch('https://api.hovi.nl/api/3' + path, {
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
const transformHoviProductToProduct = (hoviProduct: HoviProduct): Product => {
    // Function to transform product form
    const transformProductForm = (form): ProductForm => ({
        admission_description: form.admissionDescription?.nl ? generateJSON(`${form.admissionDescription.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        admission_selections: form.admissionSelections,
        admission_tests: form.admissionTests?.map(test => ({
            ...test,
            description: test.description?.nl ? generateJSON(`${test.description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null
        })),
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
        numerus_fixus_capacity: form.numerusFixus?.capacity,
        numerus_fixus_tries: form.numerusFixus?.numberOfTries,
        numerus_fixus_url: form.numerusFixus?.numerusUrl?.nl,
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
            application_deadline: start.applicationDeadlineNL,
            starting_date: start.startingDate,
            end_date: start.endDate
        })) || [],
        product_url: form.productURL?.nl,
        product_url_en: form.productURL?.en,
        scholarships: form.scholarships?.map(scholarship => scholarship.scholarship) || [],
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
        tuition_fee_url: form.tuitionFeeUrl?.nl
    });

    return {
        title: hoviProduct.productName?.nl || '',
        english_title: hoviProduct.productName?.en || null,
        product_type: hoviProduct.productType,
        description: hoviProduct.description?.nl ? generateJSON(`${hoviProduct.description.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
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
const transformHoviLocationToLocation = (hoviLocation: HoviLocation): Location => {
    const { locationId, locationName, visitorAddress, vestigingSK123Id, webLink } = hoviLocation;
    return {
        hovi_id: locationId,
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
const organizationIds: OrganizationIds = await get('/organization');

// Read existing files and filter out already processed organization IDs
const existingFiles = fs.readdirSync('./output');
const existingOrganizationIds = new Set(
    existingFiles
        .filter(file => file.startsWith('organization_') && file.endsWith('.json'))
        .map(file => file.replace('organization_', '').replace('.json', ''))
);

const filteredOrganizationIds = organizationIds.filter(({ organizationId }) => !existingOrganizationIds.has(organizationId));

// Process each organization
for (const { organizationId } of filteredOrganizationIds) {
    try {
        const organization: HoviOrganization = await get(`/organization/${organizationId}`);
        const { brin, brinName, description, organizationType, shortCode, phone, email, webLink } = organization;

        // Fetch product and location IDs for the organization
        const productIds: ProductIds = await get(`/organization/${organizationId}/product`);
        const locationIds: LocationIds = await get(`/organization/${organizationId}/location`);

        // Transform locations
        const locations = await Promise.all(locationIds.map(async ({ locationId }): Promise<Location> => {
            const location: HoviLocation = await get(`/organization/${organizationId}/location/${locationId}`);
            return transformHoviLocationToLocation(location);
        }));

        // Transform products and associate them with locations
        const products = await Promise.all(productIds.map(async ({ productId }): Promise<Product & { location: Location | null }> => {
            const product: HoviProduct = await get(`/organization/${organizationId}/product/${productId}`);
            const location = locations.find(location => location.hovi_id === product.location);
            return {
                ...transformHoviProductToProduct(product),
                location: location || null
            };
        }));

        // Create organization data object
        const data: Organization = {
            title: brinName.nl,
            code: shortCode,
            description: description?.nl ? generateJSON(`${description.nl}`, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null,
            type: organizationType === 'university' ? 'universiteit' : organizationType === 'university_of_applied_sciences' ? 'hogeschool' : organizationType === 'international_education' ? 'internationaal onderwijs' : 'onderzoeksuniversiteit',
            brin_code: brin,
            hovi_id: organizationId,
            phone: phone || null,
            email: email || null,
            website: !!webLink ? Object.entries(webLink).map(([key, value]) => ({
                url: value,
                lang: key === 'nl' ? 'Nederlands' : key === 'en' ? 'Engels' : 'Overig'
            })) : null,
            english_title: brinName?.en || null,
            products
        };

        // Write organization data to file
        const filePath = `./output/organization_${data.hovi_id}.json`;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(`Error processing organizationId ${organizationId}:`, err);
    }
}