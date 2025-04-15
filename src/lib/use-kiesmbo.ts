import { fetchData } from "../utils/extractKiesMbo";
import type { HOrganizationDetailsList } from "../types/hovi.short";
import { transformHoviOrganizationToOrganization, transformHoviProductToProduct, transformHoviLocationToLocation, addGeoDataToLocation } from "../utils/transformHovi";
import { useConfig } from "./use-config";

type Options = {
    filterByCreboCodes?: boolean
    filterByStudyNumbers?: boolean
}

/** Returns an object containing all raw data from HOVI */
export const useRawKiesMbo = async (opt?: Options) => {
    const { filterByCreboCodes = false, filterByStudyNumbers = false } = opt || {};
    const data = await fetchData();

    if (!data) {
        console.error('No data found');
        // FIXME
        // this should not happen, but it can. I think we just want to abort the process at this point.
        // But how to do that grafefully?
        return {
            _organizations: [],
            _products: [],
            _locations: [],
        }
    }

    let { organizations: _organizations, locations: _locations, products: _products } = data;

    const { creboCodes, studyNumbers } = useConfig().kiesmbo;
    if (filterByCreboCodes && !!creboCodes.length) {
        console.log(`Filtering by crebo codes: ${creboCodes}`);
        _products = _products.filter(product => product.crebo && creboCodes.includes(product.crebo))
        _organizations = _organizations.filter(org => _products.some(product => product.organization_id === org.organization_id))
        _locations = _locations.filter(location => _products.some(product => product.location_ids.includes(location.location_id)))
    }

    if (filterByCreboCodes && !!studyNumbers.length) {
        console.log(`Filtering by study numbers: ${studyNumbers}`);
        _products = _products.filter(product => product.studyNumber && studyNumbers.includes(product.studyNumber))
        _organizations = _organizations.filter(org => _products.some(product => product.organization_id === org.organization_id))
        _locations = _locations.filter(location => _products.some(product => product.location_ids.includes(location.location_id)))
    }

    return {
        _organizations,
        _products,
        _locations,
    }
}



export const useKiesMbo = async (opt?: Options) => {
    const { filterByCreboCodes = false, filterByStudyNumbers = false } = opt || {};
    const { _organizations, _products, _locations } = await useRawKiesMbo({filterByCreboCodes, filterByStudyNumbers});
    
    const transformedOrganizations = await Promise.all(_organizations.map(o => o));
    const transformedProducts = await Promise.all(_products.map(p => p)).then(products => products.filter(product => product !== null));
    const transformedLocations = await Promise.all(_locations.map(l => l)).then(locations => locations.filter(location => location !== null));

    return {
        // Data stores
        /**
         * Transformed organizations fetched from KiesMBO.
         * 
         * **Note:** It is preferred to use the `getAllOrganizations` or `getOrganizationById` methods
         * instead of accessing this store directly.
         */
        _organizations: transformedOrganizations,
        /**
         * Transformed locations fetched from KiesMBO.
         * 
         * **Note:** It is preferred to use the `getAllLocations` or `getLocationById` methods
         * instead of accessing this store directly.
         */
        _locations: transformedLocations,
        /**
         * Transformed products fetched from KiesMBO.
         * 
         * **Note:** It is preferred to use the `getAllProducts` or `getProductById` methods
         * instead of accessing this store directly.
         */
        _products: transformedProducts,
       

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
        getOrganizationById: (id: string) => transformedOrganizations.find(org => org.organization_id === id) || null,
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
        getLocationById: (id: string) => transformedLocations.find(location => location.location_id === id) || null,
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
        getProductById: (id: string) => transformedProducts.find(product => product.product_id === id) || null,
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
            const organization = transformedOrganizations.find(org => org.organization_id === organizationId);
            if (!organization) return null;

            const products = transformedProducts.filter(product => product.organization_id === organizationId);
            const locations = transformedLocations.filter(location => location.organization_ids.includes(organizationId));

            return {
                ...organization,
                products,
                locations
            }
        }
    }
}