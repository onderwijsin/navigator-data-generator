import type { MOrganizationExtended, MLocationExtended, MProductExtended } from "../types/kiesmbo.hardcoded";
import type { Organization, Location, Product, ProductForm, ProductFormKey } from "../types";
import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

function getStreet (opt: {street?: string | null, houseNumber?: string | null}): string | null {
    const { street, houseNumber } = opt;
    if (!street) return null;
    if (!houseNumber) return street;
    return `${street} ${houseNumber}`;
}

/**
 * Transforms a KiesMBO location object into the internal Location format.
 *
 * @param location - The KiesMBO location object to transform.
 * @returns The transformed Location object.
 */
export const transformKiesMboLocationToLocation = (location: MLocationExtended): Location => {
    const { location_id, organization_id, name, street, houseNumber, zipCode, city, province, website, phoneNumber, email } = location;
    return {
        hovi_id: null,
        name: name || null,
        street: getStreet({ street, houseNumber }),
        zip: zipCode?.replace(' ', '') || null,
        city: city || null,
        country: city ? 'Nederland' : null, // Only populate if city is available
        vendor: 'kiesmbo',
        url: website || null,
        brinvest: location_id,
        organization_hovi_id: null,
        organization_kiesmbo_id: organization_id
    };
};


function formatProductForm (form: string): ProductFormKey {
    const val = form.trim()
    if (val === 'BBL') return 'duaal'
    return 'voltijd'
}

function getFormUrl (path: string, product: MProductExtended): string {
    if (product.urls?.length === 1 && product.urls[0]) return product.urls[0].url || ''

    // Try to find path related url
    const url = product.urls?.find(url => url.url && url.url.toLowerCase().includes(path.toLowerCase()))
    // If found, return it
    if (url?.url) return url.url

    // Otherwise return the first url as a default
    if (product.urls?.[0]?.url) return product.urls[0].url

    return ''
}

/**
 * Generates an array of ProductForm objects from a KiesMBO product.
 * Handles mapping of learning paths (e.g., BOL/BBL) to internal product form keys,
 * and attaches URLs and descriptions for each form.
 *
 * @param product - The KiesMBO product object to extract forms from.
 * @returns An array of ProductForm objects for the given product.
 */
function getProductForms (product: MProductExtended): ProductForm[] {
    if (product.learningPaths.includes('BOL/BBL')) {
        product.learningPaths = ['BOL', 'BBL']
    }
    return product.learningPaths.map((path) => {
        const form = formatProductForm(path)
        const url = getFormUrl(path, product)
        return {
            product_form: form,
            vendor: 'kiesmbo',
            numerus_fixus: !!product.hasNumerusFixus,
            product_description: product.intro ? generateJSON(product.intro, [
                Document, Paragraph, Text, Bold, Link, Italic
            ]) : null,
            product_url: url || null,
        }
    })
}

/**
 * Transforms a KiesMBO product object into the internal Product format.
 *
 * @param product - The KiesMBO product object to transform.
 * @returns A promise that resolves to the transformed Product object.
 */
export const transformKiesMboProductToProduct = async (product: MProductExtended): Promise<Product> => {
    const { product_id, name, crebo, profile, location_id, organization_id } = product;
    return {
        hovi_id: null,
        kiesmbo_id: product_id,
        title: name,
        product_type: 'crebo_program',
        product_level: 'mbo',
        crebo,
        crebo_profile: profile,
        vendor: 'kiesmbo',
        location_hovi_id: null,
        location_kiesmbo_id: location_id,
        organization_kiesmbo_id: organization_id,
        product_forms: getProductForms(product),
    }
};

const getCode = (val: string | null | undefined): string | null => {
    if (!val) return null;
    const code = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    return code.length > 5 ? code.slice(0, 5) : code;
}

/**
 * Transforms a KiesMBO organization object into the internal Organization format.
 *
 * @param organization - The KiesMBO organization object to transform.
 * @returns A promise that resolves to the transformed Organization object.
 */
export const transformKiesMboOrganizationToOrganization = async (organization: MOrganizationExtended): Promise<Organization> => {
    const { brin, name, website, logoUrl, product_ids, location_ids, organization_id, main_location } = organization;

    return {
        title: name || null,
        code: getCode(name),
        description: null,
        type: 'mbo',
        brin_code: brin || null,
        vendor: 'kiesmbo',
        logoUrl: logoUrl || null,
        hovi_id:  null,
        kies_mbo_id: organization_id,
        phone: null,
        email: null,
        website: website ? [{ 
            url: website,
            lang: 'Nederlands' as const
        }] : null,
        main_location,
        product_ids,
        location_ids,
    } satisfies Organization;
}