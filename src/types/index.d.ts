import { degrees } from './src/static/degrees'
import { Vendor } from './utils'

type Organization = {
    title: string | null,
    code: string | null,
    description: any, // tiptap JSON
    type: 'mbo' | 'hogeschool' | 'universiteit' | 'onderzoeksuniversiteit' | 'internationaal onderwijs',
    phone: string | null,
    email: string | null,
    website: { url : string, lang: 'Nederlands' | 'Engels' | 'Overig' }[] | null,
    brin_code: string | null,
    logoUrl: string | null,
    vendor: Vendor,
    hovi_id: string | null,
    main_location: string | null,
    products: Array<Product>
    locations: Array<LocationWithGeoData>
}


type ProductForm = {
    product_form: 'duaal' | 'voltijd' | 'deeltijd',
    vendor: Vendor,
    admission_description?: any, // tiptap JSON (nl only)
    admission_selections?: {
        capacities?: boolean,
        grades?: boolean,
        preEducation?: boolean,
        testMethod?: string | null,
        validFor?: ('ownstudents' | 'outsideinstitute' | 'outsidepartnerships' | 'international')[]
    }[] | null,
    admission_tests?: {
        description?: any, // tiptap JSON (nl only)
        testMethod?: string | null
    }[] | null,
    admission_url?: string,
    instruction_mode_description?: any, // tiptap JSON (nl only)
    instruction_modes: string[],
    job_perspective?: any, // tiptap JSON (nl only)
    lang_requirements_description?: any, // tiptap JSON (nl only)
    lang_exam?: string,
    lang_exam_minimum_score?: string,
    numerus_fixus: boolean,
    numerus_fixus_capacity?: number | null,
    numerus_fixus_tries?: number,
    numerus_fixus_url?: string,
    product_description?: any, // tiptap JSON (nl only)
    product_result?: any, // tiptap JSON (nl only)
    application_deadlines: {
        application_deadline: string | null,
        starting_date: string | null,
        end_date: string | null
    }[],
    product_url?: string,
    scholarships?: string[],
    study_advices?: {
        binding?: boolean,
        minimumECTS?: number,
        period?: number
    }[],
    study_costs?: {
        amount?: string,
        description?: any // tiptap JSON (nl only)
    }[],
    tracks?: {
        productForm: string,
        track: string
    }[],
    tuition_fees?: {
        amount?: string,
        definitive?: boolean,
        description?: any, // tiptap JSON (nl only)
        tuitionFeePeriod: string,
        tuitionFeeType: string,
        year: number
    }[]
}

type Product = {
    title: string,
    product_type: string,
    product_level?: string | null,
    croho?: string | null,
    croho_name?: string,
    degrees?: (typeof degrees[number]['title']['nl'])[],
    croho_sector?: string | null,
    credits?: string,
    financing?: string | null,
    vendor: Vendor,
    location_hovi_id?: string | null,
    organization_hovi_id?: string | null,
    product_forms: ProductForm[]
}

type Location = {
    hovi_id: string | null,
    name: string | null // locationName.nl,
    street: string | null // street + houseNumber,
    zip: string | null,
    city: string | null,
    country: string | null
    url: string | null // webLink.nl
    vestiging_SK123_id?: string
    vendor: Vendor,
    organization_hovi_id?: string | null,
    brinvest: string | null
}


type LocationComponents = {
    geometry: {
      coordinates: [number, number];
      type: "Point";
    };
    properties: {
      country: string;
      postalCode: string;
      administrativeArea: string;
      raw: {
        longText: string;
        shortText: string;
        types: string[];
      }[];
      displayName: string;
      formated: string;
      viewport: {
        south: number;
        west: number;
        north: number;
        east: number;
      };
    };
    type: "Feature";
};

type GeoFields = {
    "location_address": string | null,
    "location_components": LocationComponents | null,
    "location_data": {
        type: "Point",
        coordinates: [number, number]
    } | null,
}

type LocationWithGeoData = Location & GeoFields