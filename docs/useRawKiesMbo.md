# `useRawKiesMbo` Composable

The `useRawKiesMbo` composable is a utility function designed to fetch raw data from the KiesMBO API. It retrieves organizations (schools), products (studies), and locations, while handling errors and supporting optional filtering. This composable is primarily used as a foundational layer for fetching unprocessed data, which can then be transformed or enhanced as needed.

## Features

- Fetches raw data from the KiesMBO API, including:
  - Organizations (schools)
  - Products (studies)
  - Locations
- Handles API errors and logs issues to the console.
- Supports caching for improved performance (if enabled).
- **Optional filtering**: Supports filtering data by CREBO codes and/or study numbers (as defined in your config file).

## Function Signature

```typescript
export const useRawKiesMbo: (opt?: { filterByCreboCodes?: boolean, filterByStudyNumbers?: boolean }) => Promise<{
  _organizations: MOrganizationExtended[];
  _products: MProductExtended[];
  _locations: MLocationExtended[];
}>
```

### Parameters

- `opt` (optional): An object containing the following properties:
  - `filterByCreboCodes` (optional): Boolean flag to filter data by CREBO codes. If `true`, only data matching the configured CREBO codes will be included. Defaults to `false`.
  - `filterByStudyNumbers` (optional): Boolean flag to filter data by study numbers. If `true`, only data matching the configured study numbers will be included. Defaults to `false`.

## Returned Data

The function returns an object containing the following properties:

- `_organizations`: An array of raw organization (school) objects fetched from the KiesMBO API.
- `_products`: An array of raw product (study) objects associated with the organizations.
- `_locations`: An array of raw location objects associated with the organizations.

```typescript
import { useRawKiesMbo } from '../lib/use-kiesmbo';

(async () => {
  const { _organizations, _products, _locations } = await useRawKiesMbo();

  console.log('Organizations:', _organizations);
  console.log('Products:', _products);
  console.log('Locations:', _locations);

  // With filtering by CREBO codes
  const filtered = await useRawKiesMbo({ filterByCreboCodes: true });
  console.log('Filtered Organizations:', filtered._organizations);
})();
```

## Implementation Details

#### Error Handling

If no organizations are found, the function logs an error and returns empty arrays for all data types. This helps identify issues with configuration or API connectivity.

#### Caching

If caching is enabled (`ENABLE_CACHE=true`), the function stores API responses locally and retrieves them from the cache if they are still valid (based on the `CACHE_TTL`).

#### Steps

1. Loads configuration for CREBO codes and study numbers.
2. Fetches all organizations, products, and locations from the KiesMBO API, applying filters if specified.
3. Returns the raw data in a structured format.

#### Notes

- This composable is intended for internal use and provides raw data. For transformed or enhanced data, use the `useKiesMbo` composable.
- Filtering by CREBO codes or study numbers can significantly reduce the amount of data fetched and processed.
