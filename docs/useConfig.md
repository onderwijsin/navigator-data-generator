# `useConfig`

The `useConfig` utility provides access to the application's configuration settings, which are defined in the `config.ts` file. These settings include API credentials, base URLs, rate limits, and other environment-specific configurations.

## Usage

To use the `useConfig` utility, simply import it into your module and call the function to retrieve the configuration object.

### Example

```typescript
import { useConfig } from './src/lib/use-config';

const config = useConfig();

console.log(config.hovi.baseUrl); // Outputs: 'https://api.hovi.nl/api/4'
console.log(config.google.apiKey); // Outputs the Google API key from the environment variables
```

## Configuration Structure

The configuration object contains the following sections:

### `hovi`

Settings related to the HOVI API.

- **`token`**: The API token for authenticating with HOVI (from `HOVI_TOKEN` environment variable).
- **`baseUrl`**: The base URL for the HOVI API.
- **`oasUrl`**: The URL for the HOVI OpenAPI specification.
- **`rateLimit`**: The maximum number of batches per second for API requests.
- **`batchSize`**: The maximum number of parallel requests in a batch.
- **`crohoCodes`**: A list of CROHO codes used for mapping educational programs.

### `kiesmbo`

Settings related to the KiesMBO API.

- **`userId`**: The user ID for KiesMBO (from `KIESMBO_USER_ID` environment variable).
- **`token`**: The API token for KiesMBO (from `KIESMBO_TOKEN` environment variable).
- **`baseUrl`**: The base URL for the KiesMBO API.
- **`sessionToken`**: A session token required for accessing certain KiesMBO endpoints (from `KIESMBO_SESSION_TOKEN` environment variable).
- **`oasUrl`**: The URL for the KiesMBO OpenAPI specification.

### `google`

Settings related to Google APIs.

- **`apiKey`**: The API key for Google services (from `GOOGLE_API_KEY` environment variable).
- **`useDummyData`**: A flag indicating whether to use dummy data for Google API responses (default: `true`).

## Environment Variables

The following environment variables are required for the configuration:

- **`HOVI_TOKEN`**: The API token for HOVI.
- **`KIESMBO_USER_ID`**: The user ID for KiesMBO.
- **`KIESMBO_TOKEN`**: The API token for KiesMBO.
- **`KIESMBO_SESSION_TOKEN`**: The session token for KiesMBO.
- **`GOOGLE_API_KEY`**: The API key for Google services.
- **`USE_GOOGLE_DUMMY_DATA`**: (Optional) Set to `false` to disable dummy data for Google APIs.

## Notes

- Ensure that all required environment variables are set before running the application.
- The `useConfig` utility simplifies access to configuration settings, making it easier to manage environment-specific values in a centralized manner.