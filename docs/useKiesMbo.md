# `useKiesMbo` Composable

The `useKiesMbo` composable is a high-level utility function designed to fetch, transform, and expose data from the KiesMBO API. It builds upon the `useRawKiesMbo` composable by transforming raw data into a user-friendly format and providing additional methods for querying and enhancing the data. This composable is intended to be used in user-land code.

## Features

- Fetches and transforms data from the KiesMBO API, including:
  - Organizations (schools)
  - Products (studies)
  - Locations
- Provides methods for querying and retrieving specific data.
- Supports geolocation enhancement for locations.
- Handles errors gracefully and logs issues to the console.
- **Optional filtering**: Supports filtering data by CREBO codes and/or study numbers (as defined in your config file).

## Function Signature

```typescript
export const useKiesMbo: (opt?: { filterByCreboCodes?: boolean, filterByStudyNumbers?: boolean }) => Promise<{
  _organizations: Organization[];
  _products: Product[];
  _locations: Location[];
  addGeoDataToLocation: (location: Location) => Promise<LocationWithGeoData>;
  getOrganizationById: (id: string) => Organization | null;
  getLocationById: (id: string) => Location | null;
  getProductById: (id: string) => Product | null;
  getAllOrganizations: () => Organization[];
  getAllLocations: () => Location[];
  getAllProducts: () => Product[];
  getOrganizationDetails: (organizationId: string) => (Organization & { locations: Location[], products: Product[] }) | null;
}>
```

### Parameters
- `opt` (optional): An object containing the following properties:
  - `filterByCreboCodes` (optional): Boolean flag to filter data by CREBO codes. If `true`, only data matching the configured CREBO codes will be included. Defaults to `false`.
  - `filterByStudyNumbers` (optional): Boolean flag to filter data by study numbers. If `true`, only data matching the configured study numbers will be included. Defaults to `false`.

## Returned Data
The function returns an object containing the following properties and methods:

- `_organizations`: An array of transformed organization (school) objects.
- `_products`: An array of transformed product (study) objects.
- `_locations`: An array of transformed location objects.
- `addGeoDataToLocation(location)`: Enhances a location object with geolocation data.
- `getOrganizationById(id)`: Retrieves an organization by its KiesMBO organization ID (BRIN).
- `getLocationById(id)`: Retrieves a location by its brinvest code.
- `getProductById(id)`: Retrieves a product by its KiesMBO product ID.
- `getAllOrganizations()`: Returns all transformed organizations.
- `getAllLocations()`: Returns all transformed locations.
- `getAllProducts()`: Returns all transformed products.
- `getOrganizationDetails(organizationId)`: Returns an organization with its associated products and locations.

```typescript
import { useKiesMbo } from '../lib/use-kiesmbo';

(async () => {
  const kiesmbo = await useKiesMbo();

  const organizations = kiesmbo.getAllOrganizations();
  console.log('Organizations:', organizations);

  const location = kiesmbo.getLocationById("456");
  console.log('Location:', location);

  const enhancedLocation = await kiesmbo.addGeoDataToLocation(location);
  console.log('Enhanced Location:', enhancedLocation);

  // With filtering by CREBO codes
  const filteredKiesmbo = await useKiesMbo({ filterByCreboCodes: true });
  const filteredOrganizations = filteredKiesmbo.getAllOrganizations();
  console.log('Filtered Organizations:', filteredOrganizations);
})();
```

## Methods

### `addGeoDataToLocation(location)`
Enhances a location object with geolocation data, including address components and geographical coordinates.

### `getOrganizationById(id)`
Retrieves an organization by its KiesMBO organization ID (BRIN).

### `getLocationById(id)`
Retrieves a location by its brinvest code.

### `getProductById(id)`
Retrieves a product by its KiesMBO product ID.

### `getAllOrganizations()`
Returns all transformed organizations.

### `getAllLocations()`
Returns all transformed locations.

### `getAllProducts()`
Returns all transformed products.

### `getOrganizationDetails(organizationId)`
Returns an organization with its associated products and locations.

## Example usage
```typescript
import { useKiesMbo } from '../lib/use-kiesmbo';

const kiesmbo = await useKiesMbo();

const organizations = kiesmbo.getAllOrganizations();
console.log('Organizations:', organizations);

const location = kiesmbo.getLocationById("456");
console.log('Location:', location);

const enhancedLocation = await kiesmbo.addGeoDataToLocation(location);
console.log('Enhanced Location:', enhancedLocation);

// With filtering by CREBO codes
const filteredKiesmbo = await useKiesMbo({ filterByCreboCodes: true });
const filteredOrganizations = filteredKiesmbo.getAllOrganizations();
console.log('Filtered Organizations:', filteredOrganizations);
```

## Notes
- The `useKiesMbo` composable is designed for user-land code and provides transformed data with additional utility methods.
- It builds upon `useRawKiesMbo` and ensures that the data is ready for direct use in applications.
- The `filterByCreboCodes` and `filterByStudyNumbers` options allow for narrowing down the data set based on specific codes, which can be useful for targeted applications.
