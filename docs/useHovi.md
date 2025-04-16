# `useHovi` Composable

The `useHovi` composable is a high-level utility function designed to fetch, transform, and expose data from the Hovi API. It builds upon the `useRawHovi` composable by transforming raw data into a user-friendly format and providing additional methods for querying and enhancing the data. This composable is intended to be used in user-land code.

## Features

- Fetches and transforms data from the Hovi API, including:
  - Organizations
  - Products
  - Locations
  - Degrees
- Provides methods for querying and retrieving specific data.
- Supports geolocation enhancement for locations.
- Handles errors gracefully using the `ErrorLogger` utility.
- **Optional filtering**: Supports filtering data by CROHO codes (as defined in your config file).
  
## Function Signature

```typescript
export const useHovi: (opt?: { filterByCrohoCodes?: boolean }) => Promise<{
  _organizations: Organization[];
  _products: Product[];
  _locations: Location[];
  _degrees: HDegrees | null;
  addGeoDataToLocation: (location: Location) => Promise<LocationWithGeoData>;
  getOrganizationById: (id: string) => Organization | null;
  getLocationById: (id: string) => Location | null;
  getProductById: (id: string) => Product | null;
  getAllOrganizations: () => Organization[];
  getAllLocations: () => Location[];
  getAllProducts: () => dProduct[];
  getAllDegrees: () => HDegrees | null;
  getOrganizationDetails: (organizationId: string) => Organization & { locations: Location[], products: Product[] } | null;
}>
```
### Parameters
- `opt` (optional): An object containing the following properties:
  - `filterByCrohoCodes` (optional): A boolean flag indicating whether to filter the data by CROHO codes. If `true`, only data matching the configured CROHO codes will be included. Defaults to `false`.


## Returned Data
The function returns an object containing the following properties:

- `_organizations`: An array of transformed organization objects.
- `_products`: An array of transformed product objects.
- `_locations`: An array of transformed location objects.
- `_degrees`: A list of degrees fetched from the Hovi API.

## Methods
#### **`addGeoDataToLocation`**
Enhances a location object with geolocation data, including address components and geographical coordinates.

**Parameters**:
- location: The location object to enhance.

**Returns**: A promise that resolves to the enhanced location object.

Example:
```typescript
const location = { hovi_id: "123", name: "Example Location" };
const enhancedLocation = await addGeoDataToLocation(location);
console.log(enhancedLocation.location_data.coordinates); // [longitude, latitude]
```

#### **`getOrganizationById`**  
Retrieves an organization by its Hovi ID.

**Parameters**:
- `id`: The Hovi ID of the organization.

**Returns**: The organization object if found, or `null` if not found.

Example:
```typescript
const organization = getOrganizationById("123");
console.log(organization?.title); // "Example Organization"
```

#### **`getLocationById`**  
Retrieves a location by its Hovi ID.

**Parameters**:
- `id`: The Hovi ID of the location.

**Returns**: The location object if found, or `null` if not found.

Example:
```typescript
const location = getLocationById("456");
console.log(location?.name); // "Example Location"
```

#### **`getProductById`**  
Retrieves a product by its Hovi ID.

**Parameters**:
- `id`: The Hovi ID of the product.

**Returns**: The product object if found, or `null` if not found.

Example:
```typescript
const product = getProductById("789");
console.log(product?.title); // "Example Product"
```

#### `getAllOrganizations`  
Retrieves all transformed organizations.

**Returns**: An array of all transformed organization objects.

Example:
```typescript
const organizations = getAllOrganizations();
console.log(organizations.length); // 10
```

#### `getAllLocations`  
Retrieves all transformed locations.

**Returns**: An array of all transformed location objects.

Example:
```typescript
const locations = getAllLocations();
console.log(locations.length); // 20
```

#### `getAllProducts`  
Retrieves all transformed products.

**Returns**: An array of all transformed product objects.

Example:
```typescript
const products = getAllProducts();
console.log(products.length); // 50
```

#### `getAllDegrees`  
Retrieves all degrees fetched from the Hovi API.

**Returns**: An array of degree objects.

Example:
```typescript
const degrees = getAllDegrees();
console.log(degrees.length); // 5
```

#### `getOrganizationDetails`  
Retrieves detailed information about an organization, including its associated products and locations.

**Parameters**:
- `organizationId`: The Hovi ID of the organization.

**Returns**: An object containing the organization, its products, and its locations, or `null` if the organization is not found.

Example:
```typescript
const details = getOrganizationDetails("123");
console.log(details?.products.length); // 10
console.log(details?.locations.length); // 5
```

## Example usage
```typescript
import { useHovi } from '../lib/use-hovi';

const hovi = await useHovi();

const organizations = hovi.getAllOrganizations();
console.log('Organizations:', organizations);

const location = hovi.getLocationById("456");
console.log('Location:', location);

const enhancedLocation = await hovi.addGeoDataToLocation(location);
console.log('Enhanced Location:', enhancedLocation);

// With filtering by CROHO codes
const filteredHovi = await useHovi({ filterByCrohoCodes: true });
const filteredOrganizations = filteredHovi.getAllOrganizations();
console.log('Filtered Organizations:', filteredOrganizations);
```


### Notes
- The ``useHovi`` composable is designed for user-land code and provides transformed data with additional utility methods.
- It builds upon `useRawHovi` and ensures that the data is ready for direct use in applications.
- The `filterByCrohoCodes` option allows for narrowing down the data set based on specific CROHO codes, which can be useful for targeted applications.