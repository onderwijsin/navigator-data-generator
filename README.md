# Extract HOVI and KiesMBO Data with the Navigator Data Generator

This project fetches and processes data from the HOVI and KiesMBO APIs, which provide information about higher education in the Netherlands. The goal is to normalize and utilize this data for various tooling.

---

## Table of Contents
- [Extract HOVI and KiesMBO Data with the Navigator Data Generator](#extract-hovi-and-kiesmbo-data-with-the-navigator-data-generator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Data Models](#data-models)
    - [HOVI](#hovi)
    - [KiesMBO](#kiesmbo)
  - [Working with This Project](#working-with-this-project)
  - [Filtering the Data Sets](#filtering-the-data-sets)
  - [Generating Data](#generating-data)
  - [Using Composables](#using-composables)
  - [Working with (TipTap) Content](#working-with-tiptap-content)
  - [Caching](#caching)
  - [API Key Safety](#api-key-safety)
  - [About HOVI](#about-hovi)
  - [About KiesMBO](#about-kiesmbo)
  - [Needs Improvement](#needs-improvement)

---

## Features
- Makes working with data from KiesMBO and HOVI a breeze
- Filter data based on provided configuration and only fetch what you actually need
- Transform and standardize both data sets (optional)
- Enrich location data through geocoding API
- Utilize Tiptap for easy rendering of rich content
- Export your data to JSON or Excel
- Integrate the fully typed `useHovi()` and `useKiesMbo()` composables into your own codebase
- Built-in caching and error handling

> **Why the name Navigator Data Generator?** This tool was primarily developed for the [onderwijsnavigator of Het Onderwijsloket](https://onderwijsloket.com/navigator)! But we decided to open source it, because it might be useful to others as well!

---

## Prerequisites
To work with this project, **you'll need valid API keys** for:
- [SBB API Gateway](https://gateway-portal.s-bb.nl/) with access to KiesMBO API (v1 and v2)
- [HOVI](https://api.hovi.nl/) with read access to all entities
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) (if you're working with the `addGeoDataToLocation` method)

---

## Project Setup

**Requirements:**
- `pnpm@10.6.0`
- `Node.js v22.0.0` (or higher)

After forking the project, install the dependencies:

```bash
pnpm install
```

Then, modify the `config.ts` file in the root of the project.

You’ll need a `.env` file with secrets and config options. Use the provided `.env.example` in the project root as a reference. **Enable caching via the `.env` for local development — highly recommended!** This project fetches over 100MB of data through 10K+ API requests (if no filters are applied).

> ⚠️ The `addGeoDataToLocation` method utilizes Google Maps and Google Geocoding APIs. Even if cache is enabled, this can get expensive if you apply this method frequently. Use the method **only in production**! For development, set the `USE_GOOGLE_DUMMY_DATA` environment variable to intercept API calls.

Before continuing, generate the types:

```bash
pnpm typegen
```

For this to work, you’ll need an active session token from SBB, which you can only get via the GUI. Unfortunately, this is required and there’s no known workaround. Log into the [SBB Gateway](https://gateway-portal.s-bb.nl) to retrieve the token (check outgoing requests in the devtools, and look for the value of `SharedAccessSignature`).

> **Note on type generation:** The OAS from KiesMBO API is not very consistent, making it pretty much useless for dynamically generating types. The type generation script is included, but the code relies on the hardcoded types from `kiesmbo.hardcoded.d.ts` and casts the API response to these types.

---

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

> Although this makes for a standardized output, it does not mean that both data sets are equally rich: in general, the HOVI dataset contains more information than the KiesMBO dataset. One thing to note is that the HOVI dataset natively contains `ProductForms`. KiesMBO does not, which means they are generated at runtime based op `learningPaths` (BOL, BBL), and therefore each `ProductForm` for KiesMBO mostly contains the same data.

---

## Working with This Project

This project has two primary use cases:

1. **Generate output files** — export data in various formats (JSON, Excel).
2. **Use composables** — work with internal utilities and raw/transformed data.

---

## Filtering the Data Sets
If you don't need access to the entire HOVI or KiesMBO data set, you can update your config file to apply filters. These filters are on the product level (i.e. you're specifying which products to include), and propagate to locations and organizations.

- **Filtering HOVI**: specify `croho_codes` to include in the [`./config/croho_codes.ts`](./config/croho_codes.ts) file
- **Filtering KiesMBO**: specify either `crebo_codes` or `study_numbers` (or both, though not recommended) in the corresponding files in the [`config`](./config) directory.

> Note that applying filters will significantly decrease the number of outgoing requests 👌

---

## Generating Data

Generate data files using:

```bash
pnpm generate
```

Available flags:
- `--vendor` – comma-separated list of vendors to include
- `--output` – comma-separated list of output formats (`json`, `excel`)
- `--outDir` – path to write output files relative to project root
- `--raw` – export raw API data instead of transformed/normalized data (boolean)
- `--croho` - filter data set by provided croho codes in config files. Useful for filtering education related data (boolean)

Check `package.json` scripts for example usages.

---

## Using Composables

The `src/composables` directory exposes several composables. You can find detailed documentation for each composable in the [`docs`](./docs) directory:

- [`useHovi`](./docs/useHovi.md): Fetches, transforms, and exposes HOVI data with utility methods.
- [`useRawHovi`](./docs/useRawHovi.md): Fetches raw HOVI data (untransformed).
- [`useKiesMbo`](./docs/useKiesMbo.md): Fetches, transforms, and exposes KiesMBO data with utility methods.
- [`useRawKiesMbo`](./docs/useRawKiesMbo.md): Fetches raw KiesMBO data (untransformed).
- [`useConfig`](./docs/useConfig.md): Access configuration and environment variables.

```typescript
/** 
 * KiesMBO composable 
*/
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

/** 
 * HOVI composable 
 */
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


---

## Working with (TipTap) Content
When transforming data, any RTF or HTML strings from HOVI and KIESMBO are serialized as [Tiptap](https://tiptap.dev/docs) documents of type `JSONContent`. This makes it easier to render the content in a way you see fit!

When working with these content objects, you can choose any of the following strategies:
1. Write your own serializer and renderer for your framework
2. Generate HTML from the JSON with Tiptap's [`generateHTML()`](https://tiptap.dev/docs/editor/api/utilities/html) utility
3. Generate plain text from the JSON with Tiptap's [`generateText()`](https://github.com/ueberdosis/tiptap/pull/1875) utility (not recommended, since you'll lose any context)
4. Use one of TipTap's renderers (more info in [Tiptap Docs](https://tiptap.dev/docs/editor/getting-started/install))

---

## Caching

If caching is enabled (`ENABLE_CACHE=true` in your `.env`), API responses are stored locally in the `.cache/` directory and reused if still valid (see `CACHE_TTL`). This can greatly speed up development and reduce API usage. Cached files are organized by vendor and data type.

---

## API Key Safety

> **Never commit your `.env` file or API keys to version control.**

Keep your secrets safe! Use `.env` for local development and ensure it is listed in your `.gitignore`.

---

## About HOVI

De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, met name gericht op de informatie die door instellingen voor het Hoger Onderwijs moet worden aangeleverd. HOVI biedt een gestandaardiseerd systeem voor overdracht van informatie over instellingen, opleidingen en evenementen.

*HOVI is a Dutch standard for higher education information, focusing on the exchange of program and institution data for guidance and information purposes.*

👉 [HOVI API Docs](https://api.hovi.nl/hovi-api-test/)

---

## About KiesMBO

KiesMBO is dé mbo-portal voor studie- en beroepskeuze. De site helpt jongeren, ouders en docenten begrijpen hoe het mbo werkt, welke mogelijkheden het biedt en hoe je een passende keuze maakt voor de toekomst.

KiesMBO is een initiatief van het Ministerie van Onderwijs, Cultuur en Wetenschap, uitgevoerd door SBB in samenwerking met de MBO Raad, VO-Raad, bedrijfsleven en jongerenorganisaties.

De portal bevat actuele cijfers en informatie over beroepen, opleidingen en de arbeidsmarkt, continu aangeleverd door scholen en SBB. Jongeren zijn actief betrokken bij de ontwikkeling van de site.

*KiesMBO is the Dutch portal for vocational education and career choice, providing up-to-date information on programs, professions, and the labor market.*

👉 [KiesMBO API Docs](https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api&operation=Export)

---

## Needs Improvement
- [ ] Make abstraction of cacheable requests. Currently, this logic is applied separately in `extractHovi`, `extractKiesMbo`, and `geolocation`.

---