import { fetchOrganizationIds, fetchOrganizationDetails, fetchDegrees } from "../utils/extractHovi";
import type { HOrganizationDetailsList } from "../types/hovi.short";
import { transformHoviOrganizationToOrganization, transformHoviProductToProduct, transformHoviLocationToLocation, addGeoDataToLocation } from "../utils/transformHovi";
import { useConfig } from "./use-config";

type Options = {
    filterByCrohoCodes?: boolean
}

/** Returns an object containing all raw data from HOVI */
export const useRawHovi = async (opt?: Options) => {
    const { filterByCrohoCodes = false } = opt || {};
    const orgs = await fetchOrganizationIds();
    const ids = orgs?.slice(0, 1)

    if (!ids) {
        console.error('No organization IDs found');
        // FIXME
        // this should not happen, but it can. I think we just want to abort the process at this point. 
        // But how to do that grafefully?
        return {
            _organizations: [],
            _products: [],
            _locations: [],
            _degrees: []
        }
    }

    const organizations: HOrganizationDetailsList = []

    for (const org of ids) {
        const { organizationId } = org;

        const data = await fetchOrganizationDetails(organizationId);
        console.log(`Fetched data for organizationId ${organizationId}`);
        if (!data) continue
        organizations.push(data)
    }

    const { crohoCodes } = useConfig().hovi;
    const notNullOrganizations = organizations.filter(org => org !== null)
    const _degrees = await fetchDegrees()

    let _organizations = notNullOrganizations.flatMap(org => org?.organization || [])
    let _products = notNullOrganizations.flatMap(org => org?.products || [])
    let _locations = notNullOrganizations.flatMap(org => org?.locations || [])

    // If filterByCrohoCodes is true, we need to filter the entore data set by the configured croho codes
    // These codes are stored in product, therefore we need to filter the products by the croho codes
    // and then filter the organizations by the products
    // AND we need to filter the locations by the products
    if (filterByCrohoCodes) {
        console.log(`Filtering by croho codes: ${crohoCodes}`);
        _products = _products.filter(product => product.croho && crohoCodes.includes(product.croho))
        _organizations = _organizations.filter(org => _products.some(product => product.organization === org.organizationId))
        _locations = _locations.filter(location => _products.some(product => product.location === location.locationId))
    }

    return {
        _organizations,
        _products,
        _locations,
        _degrees,
    }
}



export const useHovi = async (opt?: Options) => {
    const { filterByCrohoCodes = false } = opt || {};
    const { _organizations, _products, _locations, _degrees } = await useRawHovi({filterByCrohoCodes});
    const transformedOrganizations = await Promise.all(_organizations.map(transformHoviOrganizationToOrganization));
    const transformedProducts = await Promise.all(_products.map(transformHoviProductToProduct)).then(products => products.filter(product => product !== null));
    const transformedLocations = await Promise.all(_locations.map(transformHoviLocationToLocation)).then(locations => locations.filter(location => location !== null));

    return {
        // Data stores
        /**
         * Transformed organizations fetched from HOVI.
         * 
         * **Note:** It is preferred to use the `getAllOrganizations` or `getOrganizationById` methods
         * instead of accessing this store directly.
         */
        _organizations: transformedOrganizations,
        /**
         * Transformed locations fetched from HOVI.
         * 
         * **Note:** It is preferred to use the `getAllLocations` or `getLocationById` methods
         * instead of accessing this store directly.
         */
        _locations: transformedLocations,
        /**
         * Transformed products fetched from HOVI.
         * 
         * **Note:** It is preferred to use the `getAllProducts` or `getProductById` methods
         * instead of accessing this store directly.
         */
        _products: transformedProducts,
        /**
         * Degrees fetched from HOVI.
         * 
         * **Note:** It is preferred to use the `getAllDegrees` method
         * instead of accessing this store directly.
         */
        _degrees,

        // Methods
        /**
         * Enhances a location object with geolocation data, including address components
         * and geographical coordinates.
         *
         * @param location - The location object to enhance with geolocation data.
         * @returns A promise that resolves to the enhanced location object.
         *
         * @example
         * const location = { hovi_id: "123", name: "Example Location" };
         * const enhancedLocation = await addGeoDataToLocation(location);
         * console.log(enhancedLocation.location_data.coordinates); // [longitude, latitude]
         */
        addGeoDataToLocation,
        /**
         * Retrieves an organization by its HOVI ID.
         *
         * @param id - The HOVI ID of the organization to retrieve.
         * @returns The organization object if found, or `null` if not found.
         *
         * @example
         * const organization = getOrganizationById("123");
         * console.log(organization?.title); // "Example Organization"
         */
        getOrganizationById: (id: string) => transformedOrganizations.find(org => org.hovi_id === id) || null,
        /**
         * Retrieves a location by its HOVI ID.
         *
         * @param id - The HOVI ID of the location to retrieve.
         * @returns The location object if found, or `null` if not found.
         *
         * @example
         * const location = getLocationById("456");
         * console.log(location?.name); // "Example Location"
         */
        getLocationById: (id: string) => transformedLocations.find(location => location.hovi_id === id) || null,
        /**
         * Retrieves a product by its HOVI ID.
         *
         * @param id - The HOVI ID of the product to retrieve.
         * @returns The product object if found, or `null` if not found.
         *
         * @example
         * const product = getProductById("789");
         * console.log(product?.title); // "Example Product"
         */
        getProductById: (id: string) => transformedProducts.find(product => product.hovi_id === id) || null,
        /**
         * Retrieves all transformed organizations.
         *
         * @returns An array of all transformed organization objects.
         *
         * @example
         * const organizations = getAllOrganizations();
         * console.log(organizations.length); // 10
         */
        getAllOrganizations: () => transformedOrganizations,
        /**
         * Retrieves all transformed locations.
         *
         * @returns An array of all transformed location objects.
         *
         * @example
         * const locations = getAllLocations();
         * console.log(locations.length); // 20
         */
        getAllLocations: () => transformedLocations,
        /**
         * Retrieves all transformed products.
         *
         * @returns An array of all transformed product objects.
         *
         * @example
         * const products = getAllProducts();
         * console.log(products.length); // 50
         */
        getAllProducts: () => transformedProducts,
        /**
         * Retrieves all degrees fetched from HOVI.
         *
         * @returns An array of degree objects.
         *
         * @example
         * const degrees = getAllDegrees();
         * console.log(degrees.length); // 5
         */
        getAllDegrees: () => _degrees,
        /**
         * Retrieves detailed information about an organization, including its associated
         * products and locations.
         *
         * @param organizationId - The HOVI ID of the organization to retrieve details for.
         * @returns An object containing the organization, its products, and its locations,
         * or `null` if the organization is not found.
         *
         * @example
         * const details = getOrganizationDetails("123");
         * console.log(details?.products.length); // 10
         * console.log(details?.locations.length); // 5
         */
        getOrganizationDetails: (organizationId: string) => {
            const organization = transformedOrganizations.find(org => org.hovi_id === organizationId);
            if (!organization) return null;

            const products = transformedProducts.filter(product => product.organization_hovi_id === organizationId);
            const locations = transformedLocations.filter(location => location.organization_hovi_id === organizationId);

            return {
                ...organization,
                products,
                locations
            }
        }
    }
}