# Extract HOVI and KiesMBO Data

This project fetches and processes data from the HOVI and KiesMBO APIs, which provide information about higher education in the Netherlands. The goal is to normalize and utilize this data for various tooling.

## Project Setup

**Requirements:**
- `pnpm@10.6.0`
- `Node.js v22.0.0` (or higher)

After cloning the project, install the dependencies:

```bash
pnpm install
```

Then, modify then `config.ts` file in the root of the project.

You’ll need a `.env` file with secrets and config options. Use the provided `.env.example` in the project root as a reference. **Enable caching via the `.env` for local development — highly recommended!** This project fetches over 100MB of data through 10K+ API requests.

> ⚠️ If you are using transformed data (which you mostly are) Google Maps and Google Geocoding APIs will be used. Even if cache is enabled, this can get expensive upon first fetch. Use the transformer **only in production**! For development, set the `USE_GOOGLE_DUMMY_DATA` environment variable.

Before continuing, generate the types:

```bash
pnpm typegen
```

For this to work, you’ll need an active session token from SBB, which you can only get via the GUI. Unfortunately, this is required and there’s no known workaround. Log into the [SBB Gateway](https://gateway-portal.s-bb.nl) to retrieve the token. Credentials can be found in the shared credentials list.

## Data Models
These data models are fetched from the external sources.

### HOVI

- `Organizations`
  - `Products`
    - `Location`
    - `ProductForms`
    - `Degrees`

### KiesMBO

- `Schools`
  - `Locations`
    - `Studies` (aka `Products`)

These models are transformed and enriched into a standardized data model located in [`./src/types/index.d.ts`](./src/types/index.d.ts).

## Working with This Project

This project has two primary use cases:

1. **Generate output files** — export data in various formats (JSON, Excel).
2. **Use composables** — work with internal utilities and raw/transformed data.

### Generating Data

Generate data files using:

```bash
pnpm generate
```

Available flags:
- `--vendor` – comma-separated list of vendors to include
- `--output` – comma-separated list of output formats (`json`, `excel`)
- `--outDir` – path to write output files relative to project root
- `--raw` – export raw API data instead of transformed/normalized data

Check `package.json` scripts for example usages.

### Using Composables

The `lib` directory exposes several composables:

- `useConfig` – returns project configuration from config file
- `useRawHovi` – fetches raw data from the HOVI API  
  Returns: `organizations`, `locations`, `products`, `degrees`  
  Types: see `hovi.short.d.ts`
- `useHovi` – returns transformed HOVI data (with geospatial enrichment)  
  Returns: `organizations`, `locations`, `products`  
  Types: see `index.d.ts`

## About HOVI

De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, met name gericht op de informatie die door instellingen voor het Hoger Onderwijs moet worden aangeleverd. HOVI biedt een gestandaardiseerd systeem voor overdracht van informatie over instellingen, opleidingen en evenementen.

👉 [HOVI API Docs](https://api.hovi.nl/hovi-api-test/)

## About KiesMBO

KiesMBO is dé mbo-portal voor studie- en beroepskeuze. De site helpt jongeren, ouders en docenten begrijpen hoe het mbo werkt, welke mogelijkheden het biedt en hoe je een passende keuze maakt voor de toekomst.

KiesMBO is een initiatief van het Ministerie van Onderwijs, Cultuur en Wetenschap, uitgevoerd door SBB in samenwerking met de MBO Raad, VO-Raad, bedrijfsleven en jongerenorganisaties.

De portal bevat actuele cijfers en informatie over beroepen, opleidingen en de arbeidsmarkt, continu aangeleverd door scholen en SBB. Jongeren zijn actief betrokken bij de ontwikkeling van de site.

👉 [KiesMBO API Docs](https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api&operation=Export)


## 🛠️ Needs fixing
- [ ] Why is rate limit not repected in queue processing? 