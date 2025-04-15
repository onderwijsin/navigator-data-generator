# `useRawHovi` Composable

The `useRawHovi` composable is a utility function designed to fetch raw data from the Hovi API. It retrieves organizations, products, locations, and degrees, while handling errors, rate-limiting, and batching. This composable is primarily used as a foundational layer for fetching unprocessed data, which can then be transformed or enhanced as needed.

## Features

- Fetches raw data from the Hovi API, including:
  - Organizations
  - Products
  - Locations
  - Degrees
- Handles API rate-limiting and batching.
- Logs errors using the `ErrorLogger` utility.
- Supports caching for improved performance (if enabled).
- **Optional filtering**: Supports filtering data by CROHO codes (as defined in your config file).

## Function Signature

```typescript
export const useRawHovi: (opt?: { filterByCrohoCodes?: boolean }) => Promise<{
  _organizations: HOrganization[];
  _products: HProduct[];
  _locations: HLocation[];
  _degrees: HDegrees | null;
}>
```

### Parameters
- `opt` (optional): An object containing the following properties:
  - `filterByCrohoCodes` (optional): A boolean flag indicating whether to filter the data by CROHO codes. If `true`, only data matching the configured CROHO codes will be included. Defaults to `false`.

## Returned Data
The function returns an object containing the following properties:

- `_organizations`: An array of raw organization objects fetched from the Hovi API.
- `_products`: An array of raw product objects associated with the organizations.
- `_degrees`: A list of degrees fetched from the Hovi API.
- `_locations`: An array of raw location objects associated with the organizations.

```typescript
import { useRawHovi } from '../lib/use-hovi';

(async () => {
  const { _organizations, _products, _locations, _degrees } = await useRawHovi();

  console.log('Organizations:', _organizations);
  console.log('Products:', _products);
  console.log('Locations:', _locations);
  console.log('Degrees:', _degrees);

  // With filtering by CROHO codes
  const filteredHovi = await useRawHovi({ filterByCrohoCodes: true });
  const filteredOrganizations = filteredHovi._organizations;
  console.log('Filtered Organizations:', filteredOrganizations);
})();
```

## Implementation Details

#### Error Handling

The `useRawHovi` function uses the `safeAsync` utility to handle errors gracefully. If an error occurs during data fetching, it logs the error using the `ErrorLogger` and continues processing other requests.

#### Rate-Limiting and Batching

The function adheres to the rate limit and batch size defined in the configuration. Requests are queued and processed in batches to ensure compliance with the API's rate limits.

#### Caching

If caching is enabled (`ENABLE_CACHE=true`), the function stores API responses locally and retrieves them from the cache if they are still valid (based on the `CACHE_TTL`).

#### Steps

1. Fetches a list of organization IDs using `fetchOrganizationIds`.
2. Iterates through the organization IDs to fetch detailed information about each organization, including its products and locations.
3. Fetches the list of degrees using `fetchDegrees`.
4. Returns the raw data in a structured format.

#### Notes

- If no organization IDs are found, the function logs an error and returns empty arrays for all data types.
- This composable is intended for internal use and provides raw data. For transformed or enhanced data, use the `useHovi` composable.
