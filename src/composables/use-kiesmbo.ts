import { fetchData } from "../utils/extractKiesMbo";
import { transformKiesMboOrganizationToOrganization, transformKiesMboLocationToLocation, transformKiesMboProductToProduct} from "../utils/transformKiesMbo";
import { useConfig } from "./use-config";
import { addGeoDataToLocation } from "../utils/geolocation";

type Options = {
    filterByCreboCodes?: boolean
    filterByStudyNumbers?: boolean
}

/** Returns an object containing all raw data from HOVI */
export const useRawKiesMbo = async (opt?: Options) => {
    const { filterByCreboCodes = false, filterByStudyNumbers = false } = opt || {};
    const { creboCodes, studyNumbers } = useConfig().kiesmbo;
    const data = await fetchData({
        filterByCreboCodes,
        creboCodes,
        filterByStudyNumbers,
        studyNumbers,
    });

    if (!data?.organizations?.length) {
        console.error('No data found for KiesMBO. This should not happen!');
        console.error('You have either set invalid filters, or something went wrong when fetching the data. Please check your configuration and logs.');
    }

    let { organizations: _organizations, locations: _locations, products: _products } = data;

    return {
        _organizations: data.organizations,
        _products: data.products,
        _locations: data.locations,
    }
}



export const useKiesMbo = async (opt?: Options) => {
    const { filterByCreboCodes = false, filterByStudyNumbers = false } = opt || {};
    const { _organizations, _products, _locations } = await useRawKiesMbo({filterByCreboCodes, filterByStudyNumbers});
    
    const transformedOrganizations = await Promise.all(_organizations.map(transformKiesMboOrganizationToOrganization));
    const transformedProducts = await Promise.all(_products.map(transformKiesMboProductToProduct))
    const transformedLocations = await Promise.all(_locations.map(transformKiesMboLocationToLocation))

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
        getOrganizationById: (id: string) => transformedOrganizations.find(org => org.kies_mbo_id === id) || null,
        /**
         * Retrieves a location by its brinvest code.
         *
         * @param id - The brinvest of the location to retrieve.
         * @returns The location object if found, or `null` if not found.
         *
         * @example
         * const location = getLocationById("456");
         * console.log(location?.name); // "Example Location"
         */
        getLocationById: (id: string) => transformedLocations.find(location => location.brinvest === id) || null,
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
        getProductById: (id: string) => transformedProducts.find(product => product.kiesmbo_id === id) || null,
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
            const organization = transformedOrganizations.find(org => org.kies_mbo_id === organizationId);
            if (!organization) return null;

            const products = transformedProducts.filter(product => product.organization_kiesmbo_id === organizationId);
            const locations = transformedLocations.filter(location => location.organization_kiesmbo_id === organizationId);

            return {
                ...organization,
                products,
                locations
            }
        }
    }
}