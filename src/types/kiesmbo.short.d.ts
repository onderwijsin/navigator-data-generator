import type { paths, components } from "./kiesmbo"
export type Export = {
    schools: Array<MOrganization & { locations: Array<MLocation & { studies: Array<MProduct>, opendays: Array<MOpenDay> }> }>
}
export type MOrganization = {
    brin?: string | null;
    name?: string | null;
    website?: string | null;
    logoUrl?: string | null;
};

type MOpenDay = {
    startDate?: string | null;
    endDate?: string | null;
    url?: string | null;
    type?: string | null;
    isOnline?: boolean | null;
    isGeneralOpenDay?: boolean | null;
};

type GeoCoordinate = {
    longitude?: number | null;
    latitude?: number | null;
};

type MLocation = {
    brinvest?: string | null;
    name?: string | null;
    isMainLocation?: boolean | null;
    street?: string | null;
    houseNumber?: string | null;
    zipCode?: string | null;
    city?: string | null;
    province?: string | null;
    website?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    logoUrl?: string | null;
    geoCoordinate?: GeoCoordinate | null;
};


type Url = {
    title?: string | null;
    url?: string | null;
};

type MProduct = {
    crebo?: string | null;
    learningPaths?: string[] | null;
    startingFebruary?: boolean | null;
    startingSeptember?: boolean | null;
    startingAnytime?: boolean | null;
    hasNumerusFixus?: boolean | null;
    urls?: Url[] | null;
};

type MOrganizationExtended = MOrganization & {
    /** id is equal to brinvest + orgName */
    location_ids: string[];
    /** id is equal to crebo + orgName */
    product_ids: string[];
    organization_id: string;
}

type MLocationExtended = MLocation & {
    organization_ids: string[];
    location_id: string
}

type MProductExtended = MProduct & {
    product_id: string;
    organization_id: string
    location_ids: string[];
}