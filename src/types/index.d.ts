import { degrees } from './src/static/degrees'
import { Vendor } from './utils'
import type { JSONContent } from '@tiptap/core'

/**
 * Represents an educational organization (school, university, etc.)
 * Normalized for both HOVI and KiesMBO data sources.
 */
type Organization = {
    /** The display name of the organization */
    title: string | null,
    /** Organization code (e.g., BRIN or other unique code) */
    code: string | null,
    /** Description as Tiptap JSON content */
    description: JSONContent | null, // tiptap JSON
    /** Type of organization */
    type: 'mbo' | 'hogeschool' | 'universiteit' | 'onderzoeksuniversiteit' | 'internationaal onderwijs',
    /** Main phone number */
    phone: string | null,
    /** Main email address */
    email: string | null,
    /** List of website URLs with language */
    website: { url : string, lang: 'Nederlands' | 'Engels' | 'Overig' }[] | null,
    /** BRIN code (unique Dutch school code) */
    brin_code: string | null,
    /** Logo URL */
    logoUrl: string | null,
    /** Data vendor (HOVI, KiesMBO or Onderwijsloket) */
    vendor: Vendor,
    /** HOVI organization ID (if available) */
    hovi_id: string | null,
    /** KiesMBO organization ID (set at runtime, equals BRIN) */
    kies_mbo_id: string | null,
    /** Main location (brinvest code or similar) */
    main_location: string | null,
    /** List of product (study) IDs offered by this organization */
    product_ids: string[],
    /** List of location IDs for this organization */
    location_ids: string[],
}

/**
 * Key for a product form (learning path), e.g., 'voltijd', 'deeltijd', 'duaal'.
 */
type ProductFormKey = 'duaal' | 'voltijd' | 'deeltijd'

/**
 * Represents a specific form/variant of a product (study), such as full-time, part-time, or dual.
 * Contains admission, instruction, and other metadata.
 */
type ProductForm = {
    /** The form of the product (learning path) */
    product_form: 'duaal' | 'voltijd' | 'deeltijd',
    /** Data vendor (HOVI or KiesMBO) */
    vendor: Vendor,
    /** Admission requirements description (Tiptap JSON, Dutch only) */
    admission_description?: JSONContent | null, // tiptap JSON (nl only)
    /** Admission selection criteria */
    admission_selections?: {
        capacities?: boolean,
        grades?: boolean,
        preEducation?: boolean,
        testMethod?: string | null,
        validFor?: ('ownstudents' | 'outsideinstitute' | 'outsidepartnerships' | 'international')[]
    }[] | null,
    /** Admission tests information */
    admission_tests?: {
        description?: JSONContent | null, // tiptap JSON (nl only)
        testMethod?: string | null
    }[] | null,
    /** URL for admission information */
    admission_url?: string,
    /** Description of instruction mode (Tiptap JSON, Dutch only) */
    instruction_mode_description?: JSONContent | null, // tiptap JSON (nl only)
    /** List of instruction modes (e.g., online, on-site) */
    instruction_modes?: string[],
    /** Job perspective description (Tiptap JSON, Dutch only) */
    job_perspective?: JSONContent | null, // tiptap JSON (nl only)
    /** Language requirements description (Tiptap JSON, Dutch only) */
    lang_requirements_description?: JSONContent | null, // tiptap JSON (nl only)
    /** Language exam name */
    lang_exam?: string,
    /** Minimum score for language exam */
    lang_exam_minimum_score?: string,
    /** Whether the program has a numerus fixus (enrollment cap) */
    numerus_fixus: boolean,
    /** Numerus fixus capacity (if applicable) */
    numerus_fixus_capacity?: number | null,
    /** Number of numerus fixus attempts allowed */
    numerus_fixus_tries?: number,
    /** URL for numerus fixus information */
    numerus_fixus_url?: string,
    /** Description of the product (Tiptap JSON, Dutch only) */
    product_description?: JSONContent | null, // tiptap JSON (nl only)
    /** Expected result of the product (Tiptap JSON, Dutch only) */
    product_result?: JSONContent | null, // tiptap JSON (nl only)
    /** Application deadlines for the product */
    application_deadlines?: {
        application_deadline: string | null,
        starting_date: string | null,
        end_date: string | null
    }[],
    /** URL for product information */
    product_url?: string | null,
    /** List of scholarships available */
    scholarships?: string[],
    /** Study advice details */
    study_advices?: {
        binding?: boolean,
        minimumECTS?: number,
        period?: number
    }[],
    /** Study costs details */
    study_costs?: {
        amount?: string,
        description?: JSONContent | null // tiptap JSON (nl only)
    }[],
    /** Tracks associated with the product */
    tracks?: {
        productForm: string,
        track: string
    }[],
    /** Tuition fees details */
    tuition_fees?: {
        amount?: string,
        definitive?: boolean,
        description?: JSONContent | null, // tiptap JSON (nl only)
        tuitionFeePeriod: string,
        tuitionFeeType: string,
        year: number
    }[]
}

/**
 * Represents a normalized product (study/opleiding) from HOVI or KiesMBO.
 * Contains all key metadata and references to forms, locations, and organizations.
 */
type Product = {
    /** HOVI product ID (if available) */
    hovi_id: string | null,
    /** KiesMBO product ID (generated at runtime, unique per org/location/crebo) */
    kiesmbo_id: string | null,
    /** Title of the product/study */
    title: string,
    /** Product type (e.g., bachelor, associate degree, mbo, etc.) */
    product_type: string,
    /** Product level (e.g., 2, 3, 4, hbo, wo, etc.) */
    product_level?: string | null,
    /** CROHO code (if applicable) */
    croho?: string | null,
    /** CROHO name (if available) */
    croho_name?: string,
    /** CREBO code (if applicable) */
    crebo?: string,
    /** CREBO profile (if available) */
    crebo_profile?: string,
    /** List of degree names (e.g., 'Bachelor of Science') */
    degrees?: (typeof degrees[number]['title']['nl'])[],
    /** CROHO sector (if available) */
    croho_sector?: string | null,
    /** Number of ECTS credits or study load */
    credits?: string,
    /** Financing type (e.g., government funded, private) */
    financing?: string | null,
    /** Data vendor (HOVI or KiesMBO) */
    vendor: Vendor,
    /** HOVI location ID (if available) */
    location_hovi_id?: string | null,
    /** KiesMBO location ID (if available) */
    location_kiesmbo_id?: string | null,
    /** HOVI organization ID (if available) */
    organization_hovi_id?: string | null,
    /** KiesMBO organization ID (if available) */
    organization_kiesmbo_id?: string | null,
    /** List of product forms (learning paths, variants) */
    product_forms: ProductForm[]
}

/**
 * Represents a normalized location (campus, branch, etc.) from HOVI or KiesMBO.
 * Contains address, organization, and vendor metadata.
 */
type Location = {
    /** HOVI location ID (if available) */
    hovi_id: string | null,
    /** Name of the location */
    name: string | null,
    /** Street address (including house number) */
    street: string | null,
    /** Postal code (zip) */
    zip: string | null,
    /** City name */
    city: string | null,
    /** Country name */
    country: string | null,
    /** Website URL for the location */
    url: string | null,
    /** Vestiging Studiekeuze123 ID (if available) */
    vestiging_SK123_id?: string,
    /** Data vendor (HOVI or KiesMBO) */
    vendor: Vendor,
    /** HOVI organization ID (if available) */
    organization_hovi_id?: string | null,
    /** KiesMBO organization ID (if available) */
    organization_kiesmbo_id: string | null,
    /** Brinvolg/brinvest code (unique location code) */
    brinvest: string | null
}

/**
 * Represents geolocation and address component details for a location.
 * Used to enrich Location objects with coordinates and structured address data.
 */
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

/**
 * Extra geolocation fields for a location, including coordinates and address components.
 */
type GeoFields = {
    /** Full address string */
    "location_address": string | null,
    /** Structured address components and geometry */
    "location_components": LocationComponents | null,
    /** GeoJSON Point coordinates */
    "location_data": {
        type: "Point",
        coordinates: [number, number]
    } | null,
}

/**
 * A Location object enriched with geolocation data.
 */
type LocationWithGeoData = Location & GeoFields