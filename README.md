# Extract HOVI and KiesMBO data
The Hovi and KiesMBO APIs contains data about higher education in the Netherlands. This tool fetches particular data models and transforms them into something more useful. The primary goal is to seed the data into a Directus instance [Datahub](https://datahub.onderwijs.in). From there we want to extract a subset of the data into the Directus instance for Onderwijsloket.

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

The extraction script outputs all data on an organization level as JSON files.


## TODOs
- [x] For each location, fetch location components via the Google Geocoding API

   **ONGOING**
- [ ] We'll also need to extract data from KiesMBO. That means we'll also need to standardize the data. 
- [ ] Shitty thing is: the KIESMBO and HOVI schema's are reversed. `Locations` are a prop of `Products` for HOVI. `Studies` (or `Products`) are a prop of `Locations` for KiesMBO. HOVI schema makes for sense
- [ ] Assign main location for each organization based on the number of products that use that location

   **NEXT UP**
- [ ] Construct Directus collection schemas based on output types
- [ ] Consider whether to split products into multiple sub collections (such as `Degrees`). Need to analyze the repetitive datapoints where collections might be needed.
- [ ] Write the Directus seeding script
- [ ] Currently, all data is being processed. This is fine for datahub, but for Onderwijsloket, we want to be able to filter education-related data. This will probably be a CROHO code filter.
- [ ] There's also `Product` data that neither exists in HOVI, nor KiesMBO, but that do result in a relevant qualification. These are 'ZiB programs' and 'educatieve minoren'. These will be added manually in Directus. We however do need to condiser how this data will fit in the schema, before writing the seeding script.


## About HOVI
De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, en is met name gericht op de informatie die noodzakelijkerwijs door de instellingen voor HO moet worden aangeleverd. De HOVI-infrastructuur levert een gestandaardiseerd systeem voor informatie-overdracht over onderwijsinstellingen, opleidingen en evenementen in het Hoger Onderwijs.

[API DOCS](https://api.hovi.nl/hovi-api-test/)

## About KiesMBO
KiesMBO is dé mbo-portal voor studie- en beroepskeuze. KiesMBO.nl toont jongeren, hun ouders en docenten hoe het mbo werkt, de talloze mogelijkheden die het mbo biedt en helpt bij het maken van een goede keuze voor een mooie toekomst.

KiesMBO.nl is in opdracht van het Ministerie van Onderwijs, Cultuur en Wetenschap ontwikkeld door de Samenwerkingsorganisatie Beroepsonderwijs Bedrijfsleven (SBB), in samenwerking met de MBO Raad, de VO-raad, het georganiseerd bedrijfsleven en jongerenorganisaties. 

KiesMBO.nl wordt voortdurend ververst met actuele cijfers en informatie van de scholen en SBB over beroepen, opleidingen en de arbeidsmarkt. Om aan te sluiten op de belevingswereld van de doelgroep, zijn jongeren gedurende het gehele proces van de ontwikkeling van de portal nauw betrokken.  

[API DOCS](https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api&operation=Export)
