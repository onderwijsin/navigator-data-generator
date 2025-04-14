type AddressComponent = {
    long_name: string
    short_name: string
    types: string[]
}

type Geometry = {
    location: {
        lat: number
        lng: number
    }
    location_type: 'ROOFTOP' | 'RANGE_INTERPOLATED' | 'GEOMETRIC_CENTER' | 'APPROXIMATE'
    viewport: {
        northeast: {
            lat: number
            lng: number
        }
        southwest: {
            lat: number
            lng: number
        }
    }
}

type PlusCode = {
    compound_code: string
    global_code: string
}

type GeocodeResult = {
    address_components: AddressComponent[]
    formatted_address: string
    geometry: Geometry
    place_id: string
    plus_code: PlusCode
    types: string[]
    partial_match?: boolean
    postcode_localities?: string[]
}

export type GeocodeResponse = {
    results: GeocodeResult[]
    status: 'OK' | 'ZERO_RESULTS' | 'OVER_DAILY_LIMIT' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR'
}