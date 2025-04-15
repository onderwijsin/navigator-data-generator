import type { paths } from "./hovi";

export type HOrganization = paths['/organization/{organizationId}']['get']['responses']['200']['content']['application/json']
export type HProductIds = paths['/organization/{organizationId}/product']['get']['responses']['200']['content']['application/json']
export type HLocationIds = paths['/organization/{organizationId}/location']['get']['responses']['200']['content']['application/json']
export type HLocation = paths['/organization/{organizationId}/location/{locationId}']['get']['responses']['200']['content']['application/json']
export type HProduct = paths['/organization/{organizationId}/product/{productId}']['get']['responses']['200']['content']['application/json']
// export type HProductWithLocation = Omit<Product, 'location'> & { location: HLocation | null }
export type HProductList = Array<HProduct>
export type HDegrees = paths['/domain/degree']['get']['responses']['200']['content']['application/json']
export type HOrganizationExtended = HOrganization & {
    vendor: Vendor
    mainLocation: HLocation['locationId'] | null
    locationIds: HLocation['locationId'][]
    productIds: HProduct['productId'][]
}
export type HOrganizationDetailsList = Array<{
    organization: HOrganizationExtended,
    products: HProductList,
    locations: HLocation[]
}>