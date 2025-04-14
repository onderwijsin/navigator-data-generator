import defu from "defu";
import { fetchOrganizationIds, fetchOrganizationDetails, fetchDegrees } from "../utils/extractHovi";
import type { HLocation, HOrganizationList } from "../types/hovi.short";
import { transformHoviOrganizationToOrganization } from "../utils/transformHovi";

/** Returns an object containing all raw data from HOVI */
export const useRawHovi = async () => {
    const ids = await fetchOrganizationIds();

    /**  
     * Array to store all unique locations. 
     * After processing all organizations, this array will be used to fetch location data from Google Apis for each unique location
     * 
     */
    const globalLocations: HLocation[] = []
    const organizations: HOrganizationList = []
   

    for (const org of ids) {
        const { organizationId } = org;

        const data = await fetchOrganizationDetails(organizationId);
        console.log(`Fetched data for organizationId ${organizationId}`);


        if (!data) continue
        for (const location of data.locations) {
            // Add locations to global locations array, or merge with existing entries
            const index = globalLocations.findIndex(loc => loc.locationId === location.locationId);
            if (index === -1) {
                globalLocations.push(location);
            } else {
                globalLocations[index] = defu(globalLocations[index], location );
            }
        }

        // Add organization to organizations array
        organizations.push(data)
    }

    const notNullOrganizations = organizations.filter(org => org !== null)

    const degrees = await fetchDegrees()

    return {
        organizations: notNullOrganizations,
        products: notNullOrganizations.flatMap(org => org?.products || []),
        locations: globalLocations,
        degrees
    }
}



export const useHovi = async () => {
    const { organizations } = await useRawHovi();
    const transformedOrganizations = await Promise.all(organizations.map(transformHoviOrganizationToOrganization));

    return {
        organizations: transformedOrganizations,
        locations: transformedOrganizations.flatMap(org => org?.locations || []),
        products: transformedOrganizations.flatMap(org => org?.products || []),
    }
}