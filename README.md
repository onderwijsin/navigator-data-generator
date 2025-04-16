# Extract HOVI and KiesMBO Data with the Navigator Data Genrator

This project fetches and processes data from the HOVI and KiesMBO APIs, which provide information about higher education in the Netherlands. The goal is to normalize and utilize this data for various tooling.

#### ✨ Features
- Makes working with data from KiesMBO and HOVI a breeze
- Filter data based on provided configuration and only fetch what you actually need
- Transform and standardize both data sets (optional)
- Enrich location data through geocoding API
- Utilize Tiptap for easy rendering of rich content
- Export your data to JSON or Excel
- Integrate `useHovi()` and `useKiesMbo()` composables into your own codebase
- Built in caching and error handling

> **Why the name Navigator Data Generator**? The answer is fairly simple: this tool was primairily developed for the [onderwijsnavigator of Het Onderwijsloket](https://onderwijsloket.com/navigator)! But we decided to open source it, because it might be useful to others as well!

### Prerequisites
To work with this project, **you'll need valid API keys** for:
- [SBB API Gateway](https://gateway-portal.s-bb.nl/) with access to KiesMBO API (v1 and v2)
- [HOVI](https://api.hovi.nl/) with read access to all entities
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) (if you're working with the `addGeoDataToLocation` method)



## Project Setup

**Requirements:**
- `pnpm@10.6.0`
- `Node.js v22.0.0` (or higher)

After forking the project, install the dependencies:

```bash
pnpm install
```

Then, modify then `config.ts` file in the root of the project.

You’ll need a `.env` file with secrets and config options. Use the provided `.env.example` in the project root as a reference. **Enable caching via the `.env` for local development — highly recommended!** This project fetches over 100MB of data through 10K+ API requests (if no filters are applied).

> ⚠️ The `addGeoDataToLocation` method utilizes Google Maps and Google Geocoding APIs. Even if cache is enabled, this can get expensive if you apply this method frequently. Use the method **only in production**! For development, set the `USE_GOOGLE_DUMMY_DATA` environment variable to intercept api calls.

Before continuing, generate the types:

```bash
pnpm typegen
```

For this to work, you’ll need an active session token from SBB, which you can only get via the GUI. Unfortunately, this is required and there’s no known workaround. Log into the [SBB Gateway](https://gateway-portal.s-bb.nl) to retrieve the token (check outgoing requests in the devtools, and look for the value of `SharedAccessSignature`).

> Note on type generation: the OAS from KiesMBO API is not very consistent, making is pretty much useless for dynamically generating types. I have left the type generation in place, but the code does not use these. Instead it relies on the hardcoded types from `kiesmbo.hardcoded.d.ts` and casts the API response to these types.

## Data Models
These data models are fetched from the external sources.

### HOVI

- `Organizations`
  - `Locations`
  - `Products`
    - `ProductForms`
    - `Degrees`

### KiesMBO

- `Schools`
  - `Locations`
    - `Studies` (aka `Products`)
      - `StudyDetails`

These models are transformed and enriched into a standardized data model located in [`./src/types/index.d.ts`](./src/types/index.d.ts).

## Working with This Project

This project has two primary use cases:

1. **Generate output files** — export data in various formats (JSON, Excel).
2. **Use composables** — work with internal utilities and raw/transformed data.

## Filtering the data sets
If you don't need access to the entire HOVI or KiesMBO data set, you can update your config file to apply filters. These filters are on the product level (i.e. you're specifying which products to include), and propagate to locations and organizations.

- **Filtering HOVI**: specify `croho_codes` to include in the `./config/croho_codes.ts` file
- **Filtering KiesMBO**: specify either `crebo_codes` or `study_numbers` (or bothm though not recommended) in the corresponding files in the config directory.

> Note that applying filters will significantly decrease the number of outgoing requests 👌

### Generating Data

Generate data files using:

```bash
pnpm generate
```

Available flags:
- `--vendor` – comma-separated list of vendors to include
- `--output` – comma-separated list of output formats (`json`, `excel`)
- `--outDir` – path to write output files relative to project root
- `--raw` – export raw API data instead of transformed/normalized data (boolean)
- `--croho` - filter data set by provided croho codes in config files. Usefull for filtering education related data (boolean)

Check `package.json` scripts for example usages.

### Using Composables

The `lib` directory exposes several composables. You can find detailed documentation on how to use these in the docs directory.

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

### Working with (TipTap) content
When transforming data, any RTF or html strings from HOVI and KIESMBO are serialized as [Tiptap](https://tiptap.dev/docs) documents of type `JSONContent`. This makes it easier to render the contentr in a way you see fit!

When working with these content objects, you can choose either of the following strategies:
1. Write your own serializer and renderer for your framework
2. Generate HTML from the JSON with Tiptap's [`generateHTML()`](https://tiptap.dev/docs/editor/api/utilities/html) utility
3. Generate plain text from the JSON with Tiptap's [`generateText()`](https://github.com/ueberdosis/tiptap/pull/1875) utility (not recommended, since you'll lose any context)
4. Use on of TipTap's renderers (more info in [Tiptap Docs](https://tiptap.dev/docs/editor/getting-started/install))

## About HOVI

De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, met name gericht op de informatie die door instellingen voor het Hoger Onderwijs moet worden aangeleverd. HOVI biedt een gestandaardiseerd systeem voor overdracht van informatie over instellingen, opleidingen en evenementen.

👉 [HOVI API Docs](https://api.hovi.nl/hovi-api-test/)

## About KiesMBO

KiesMBO is dé mbo-portal voor studie- en beroepskeuze. De site helpt jongeren, ouders en docenten begrijpen hoe het mbo werkt, welke mogelijkheden het biedt en hoe je een passende keuze maakt voor de toekomst.

KiesMBO is een initiatief van het Ministerie van Onderwijs, Cultuur en Wetenschap, uitgevoerd door SBB in samenwerking met de MBO Raad, VO-Raad, bedrijfsleven en jongerenorganisaties.

De portal bevat actuele cijfers en informatie over beroepen, opleidingen en de arbeidsmarkt, continu aangeleverd door scholen en SBB. Jongeren zijn actief betrokken bij de ontwikkeling van de site.

👉 [KiesMBO API Docs](https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api&operation=Export)


## 🛠️ Needs fixing
- [ ] Modify the output types to sometwhat satisfy the KiesMBO schemas
- [ ] Implement transformer for KiesMBO
- [ ] create docs for KiesMBO composables
- [ ] The KiesMBO data set sucks! We'll probably need to add some hardcoded stuff in the transformer

## ⚙️ Needs improvement
- [ ] make abstraction of cacheable requests. Currently this logic is applied seperately in `extractHovi`, `extractKiesMbo` and `geolocation`