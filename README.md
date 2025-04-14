# Extract HOVI and KiesMBO data
The Hovi and KiesMBO APIs contains data about higher education in the Netherlands. The aim of this project is to utilize this data.

## Project setup
Requirements:
- pnpm@10.6.0
- node v22

After cloning the project, make sure you install the dependencies
```bash
pnpm install
```

You will also need a `.env` file containg secrets and other config options. Please refer to the example file in the project root. You can enable caching via the `.env`, **this is highly recommended for local development**, since you'll be fetching a lot of data! This project uses over 100MB of data, which is fetched through 10K+ api requests.

Secondly, you will want to make sure you're types a up to date.

```bash
pnpm typegen
```

For a succesfull type generation, you need an active session token from Sbb. This sucks, but there is (AFAIK) no way around it. To acquire a session token, you'll need to log into [SBB Gateway](https://gateway-portal.s-bb.nl). Credentials can be found is the shared credentials list.


## Data models
Data models that are processed for HOVI
- `Organizations`
  - `Products`
    - `Location`
    - `ProductForms`
    - `Degrees`

Data models that are processed for Kies MBO
- `Schools`
  - `Locations`
    - `Studies` (aka `Products`)

These data models are then transformed (and enriched) into a standardized data model. These models can be found in `./src/types/index.d.ts`

## Working with this project
This project has two types of 'output:
1. You can generate data and output it into a specifiec file format (currently, json and excel are supported)
2. You can extend this project by utilizing the composables it exposes

### Generating data
You can generate data files by running `pnpm generate`. There are three flags you can utilize:
- `--vendor`: a comma seperated string of vendors to include
- `--output`: a comma seperated string of output file types (`excel` or `json`)
- `--outDir`: where to save the files to disk

Have a look at this project's `package.json` scripts for proper usage.

## Working with composables


## About HOVI
De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, en is met name gericht op de informatie die noodzakelijkerwijs door de instellingen voor HO moet worden aangeleverd. De HOVI-infrastructuur levert een gestandaardiseerd systeem voor informatie-overdracht over onderwijsinstellingen, opleidingen en evenementen in het Hoger Onderwijs.

[API DOCS](https://api.hovi.nl/hovi-api-test/)

## About KiesMBO
KiesMBO is dé mbo-portal voor studie- en beroepskeuze. KiesMBO.nl toont jongeren, hun ouders en docenten hoe het mbo werkt, de talloze mogelijkheden die het mbo biedt en helpt bij het maken van een goede keuze voor een mooie toekomst.

KiesMBO.nl is in opdracht van het Ministerie van Onderwijs, Cultuur en Wetenschap ontwikkeld door de Samenwerkingsorganisatie Beroepsonderwijs Bedrijfsleven (SBB), in samenwerking met de MBO Raad, de VO-raad, het georganiseerd bedrijfsleven en jongerenorganisaties. 

KiesMBO.nl wordt voortdurend ververst met actuele cijfers en informatie van de scholen en SBB over beroepen, opleidingen en de arbeidsmarkt. Om aan te sluiten op de belevingswereld van de doelgroep, zijn jongeren gedurende het gehele proces van de ontwikkeling van de portal nauw betrokken.  

[API DOCS](https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api&operation=Export)


## Notes
- In Datahub, Organization have location fields for their main locations. There is also a M2M field to store all of the organizations locations. Ideally, the main location would be defined in a relationship as well, but Directus Map Layouts don't support related geodata. For Onderwijsloket, this layout is not necessary!