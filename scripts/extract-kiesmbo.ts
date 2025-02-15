import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import dotenv from 'dotenv';
import fs from 'fs';
import {ofetch} from 'ofetch'

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

fs.writeFileSync('../output/kiesmbo/export/export_v2.json', JSON.stringify(response, null, 2));

import { components } from '../kiesmbo';
const { schools } = response;

const organizations: Organization[] = (schools as Array<components['schemas']['school']>).map(school => {
    

    (school.locations as Array<components['schemas']['location']>).forEach(location => {
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

        // if (location.isMainLocation) {
        //     main_location = data
        // }
        
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
        main_location: null,
        // TODO map studies from locations
        products: []
    }
    
    
});
