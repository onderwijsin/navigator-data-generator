import type { Product, ProductForm, Organization, LocationWithGeoData, Location } from "../types";
import type { paths } from "../types/hovi";
import type { HOrganizationList } from "../types/hovi.short";

// Tiptap extensions
import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

import { fetchDegrees } from "./extractHovi";
import { fetchLocationComponents, getAddress } from "./geolocation";

const degrees = await fetchDegrees();

if (!degrees) {
    throw new Error('Degrees not found');
}

// Transforms a HOVI product form to a ProductForm
const transformProductForm = (form: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']['productForms'][number]): ProductForm => ({
    product_form: form.productForm === 'dual' ? 'duaal' : form.productForm === 'parttime' ? 'deeltijd' : 'voltijd',
    vendor: 'hovi',
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
    numerus_fixus_capacity: form?.numerusFixus?.[0]?.capacity,
    numerus_fixus_tries: form.numerusFixus?.[0]?.numberOfTries,
    numerus_fixus_url: form.numerusFixus?.[0]?.numerusUrl?.nl,
    product_description: form.productDescription?.nl ? generateJSON(`${form.productDescription.nl}`, [
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

/**
* Transforms a HOVI product to a Product
* Note because we'll need to async fetch degrees, we'll need to wrap this fn in async await
*/
export const transformHoviProductToProduct = async (hoviProduct: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']): Promise<Product> => ({
        title: hoviProduct.productName?.nl || '',
        product_type: hoviProduct.productType,
        product_level: hoviProduct.productLevel,
        croho: hoviProduct.croho,
        croho_name: hoviProduct.crohoName?.nl,
        degrees: hoviProduct.degrees?.map(degree => degrees.find(d => d.rowkey === degree)?.title?.nl) as string[] || [],
        croho_sector: hoviProduct.crohoSector,
        credits: hoviProduct.credits,
        financing: hoviProduct.financing,
        vendor: 'hovi',
        location_hovi_id: hoviProduct.location,
        organization_hovi_id: hoviProduct.organization,
        product_forms: hoviProduct.productForms?.map(transformProductForm) || [] 
});

// Transforms a HOVI location to a Location
const transformHoviLocationToLocation = (hoviLocation: paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json'] | null): Location | null => {
    if (!hoviLocation) return null
    const { locationId, locationName, visitorAddress, vestigingSK123Id, webLink, organization } = hoviLocation;
    return {
        hovi_id: locationId || null,
        name: locationName?.nl || null,
        street: visitorAddress?.street && visitorAddress?.nr_detail ? `${visitorAddress?.street} ${visitorAddress?.nr_detail}` : visitorAddress?.street || null,
        zip: visitorAddress?.zip || null,
        city: visitorAddress?.city || null,
        country: visitorAddress?.country || null,
        vendor: 'hovi',
        vestiging_SK123_id: vestigingSK123Id,
        url: webLink?.nl || null,
        brinvest: null,
        organization_hovi_id: organization
    };
};

// Transforms a HOVI organization to an Organization
export const transformHoviOrganizationToOrganization = async (hoviOrganization: HOrganizationList[number]): Promise<Organization> => {
    const { organization, products, locations } = hoviOrganization;
    const { organizationId, brin, brinName, description, organizationType, shortCode, phone, email, webLink, mainLocation } = organization;

    /**
     * We still need to apply some magic to locations
     * First we transform them
     * Then we fetch the location components from Google Apis
     * And merge the data into an object of type LocationWithGeoData
     */
    const locationsWithGeoData = await Promise.all(locations.map(async (rawLocation) => {
        const location = transformHoviLocationToLocation(rawLocation);
        if (!location) return null;
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
    }));

    return {
        title: brinName?.nl || brinName?.en || null,
        code: shortCode || null,
        description: description?.nl ? generateJSON(`${description.nl}`, [
            Document, Paragraph, Text, Bold, Link, Italic
        ]) : null,
        type: organizationType === 'university' ? 'universiteit' : organizationType === 'university_of_applied_sciences' ? 'hogeschool' : organizationType === 'international_education' ? 'internationaal onderwijs' : 'onderzoeksuniversiteit',
        brin_code: brin || null,
        vendor: 'hovi',
        logoUrl: null,
        hovi_id: organizationId || null,
        phone: phone || null,
        email: email || null,
        website: !!webLink ? Object.entries(webLink).map(([key, value]) => ({
            url: value,
            lang: key === 'nl' ? 'Nederlands' : key === 'en' ? 'Engels' : 'Overig'
        })) : null,
        main_location: locations.find(location => location.locationId === mainLocation)?.locationId || null,
        products: await Promise.all(products.map(transformHoviProductToProduct)),
        locations: locationsWithGeoData.filter(location => !!location) as LocationWithGeoData[],
    } satisfies Organization;
}