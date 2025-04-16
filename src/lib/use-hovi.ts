import { fetchOrganizationIds, fetchOrganizationDetails, fetchDegrees } from "../utils/extractHovi";
import type { HLocation, HOrganizationExtended, HProduct } from "../types/hovi.short";
import { transformHoviOrganizationToOrganization, transformHoviProductToProduct, transformHoviLocationToLocation, addGeoDataToLocation } from "../utils/transformHovi";
import { useConfig } from "./use-config";

type Options = {
    filterByCrohoCodes?: boolean
}

/** Returns an object containing all raw data from HOVI */
export const useRawHovi = async (opt?: Options) => {
    const { filterByCrohoCodes = false } = opt || {};
    const ids = await fetchOrganizationIds() || []

    if (!ids.length) {
        console.error('No organizations found in useRawHovi. This should not happen!');
    }

    const _organizations: HOrganizationExtended[] = []
    const _products: HProduct[] = []
    const _locations: HLocation[] = []
    const _degrees = await fetchDegrees()

    for (const org of ids) {
        const { organizationId } = org;

        const data = await fetchOrganizationDetails(
            organizationId,
            {
                filterByCrohoCodes,
                crohoCodes: useConfig().hovi.crohoCodes,
            }
        );
        if (!data) continue

        const { organization, products, locations } = data;
        _organizations.push(organization);
        _products.push(...products);
        _locations.push(...locations);
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