import type { Product, ProductForm, Organization, LocationWithGeoData, Location } from "../types";
import type { paths } from "../types/hovi";
import type { HOrganizationExtended } from "../types/hovi.short";

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

const degrees = await fetchDegrees() || [];


/**
 * Transforms a HOVI product form into a `ProductForm` object.
 *
 * @param form - The HOVI product form object to transform.
 * @returns A `ProductForm` object containing transformed data, including:
 * - `product_form`: The type of product form (e.g., 'voltijd', 'deeltijd', 'duaal').
 * - `vendor`: The vendor name ('hovi').
 * - Various descriptions and details, such as admission requirements, job perspectives, and tuition fees.
 *
 * @example
 * const hoviProductForm = {
 *   productForm: "dual",
 *   admissionDescription: { nl: "Admission details" },
 *   tuitionFees: [{ description: { nl: "Fee details" } }]
 * };
 *
 * const productForm = transformProductForm(hoviProductForm);
 * console.log(productForm.product_form); // "duaal"
 */
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
 * Transforms a HOVI product into a `Product` object.
 *
 * @param hoviProduct - The HOVI product object to transform.
 * @returns A promise that resolves to a `Product` object containing transformed data, including:
 * - `title`: The product name.
 * - `product_type`, `product_level`, `croho`, `croho_name`: Various product details.
 * - `degrees`: A list of degree titles associated with the product.
 * - `product_forms`: Transformed product forms.
 *
 * @example
 * const hoviProduct = {
 *   productName: { nl: "Example Product" },
 *   productType: "bachelor",
 *   degrees: ["degree1", "degree2"]
 * };
 *
 * const product = await transformHoviProductToProduct(hoviProduct);
 * console.log(product.title); // "Example Product"
 */
export const transformHoviProductToProduct = async (hoviProduct: paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']): Promise<Product> => ({
        hovi_id: hoviProduct.productId || null,
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

/**
 * Transforms a HOVI location into a `Location` object.
 *
 * @param hoviLocation - The HOVI location object to transform.
 * @returns A `Location` object containing transformed data, or `null` if the input is invalid.
 *
 * @example
 * const hoviLocation = {
 *   locationId: "123",
 *   locationName: { nl: "Example Location" },
 *   visitorAddress: { street: "Main Street", zip: "12345", city: "Example City" }
 * };
 *
 * const location = transformHoviLocationToLocation(hoviLocation);
 * console.log(location.name); // "Example Location"
 */
export const transformHoviLocationToLocation = (hoviLocation: paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json'] | null): Location | null => {
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

/**
 * Transforms a HOVI organization into an `Organization` object.
 *
 * @param hoviOrganization - The HOVI organization object to transform.
 * @returns A promise that resolves to an `Organization` object containing transformed data, including:
 * - `title`: The organization name.
 * - `type`: The type of organization (e.g., 'universiteit', 'hogeschool').
 * - `brin_code`: The BRIN code of the organization.
 * - `product_ids`, `location_ids`: Lists of associated product and location IDs.
 *
 * @example
 * const hoviOrganization = {
 *   organizationId: "123",
 *   brinName: { nl: "Example University" },
 *   organizationType: "university"
 * };
 *
 * const organization = await transformHoviOrganizationToOrganization(hoviOrganization);
 * console.log(organization.title); // "Example University"
 */
export const transformHoviOrganizationToOrganization = async (hoviOrganization: HOrganizationExtended): Promise<Organization> => {
    const { organizationId, brin, brinName, description, organizationType, shortCode, phone, email, webLink, mainLocation } = hoviOrganization;

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
        main_location: mainLocation || null,
        product_ids: hoviOrganization.productIds.filter(Boolean) as string[],
        location_ids: hoviOrganization.locationIds.filter(Boolean) as string[],
        // main_location: locations.find(location => location.locationId === mainLocation)?.locationId || null,
        // products: await Promise.all(products.map(transformHoviProductToProduct)),
        // locations: locationsWithGeoData.filter(location => !!location) as LocationWithGeoData[],
    } satisfies Organization;
}