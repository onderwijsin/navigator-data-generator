# Extract HOVI data
The Hovi API contains data about higher education in the Netherlands. This tool fetches particular data models and transforms them into something more useful. The primary goal is to seed the data into a Directus instance (datahub.onderwijs.in).

Data models that are processed:
- Organizations
  - Products
    - Location
    - ProductForms
    - Degrees

The extraction script outputs all data on an organization level as JSON files.

## TODOs
- [ ] For each location, fetch location components via the Google Geocoding API
- [ ] Write the Directus seeding script
- [ ] Currently, all data is being processed. This is fine for datahub, but for Onderwijsloket, we want to be able to filter education-related data. This will probably be a CROHO code filter.
- [ ] We'll also need to extract data from KiesMBO. That means we'll also need to standardize the data.

## About HOVI
De Hoger Onderwijs Voorlichtingsinformatie-standaard (HOVI-standaard) is een infrastructuur voor opleidingsinformatie. De focus ligt op informatiestromen rondom het aanbieden van opleidingsinformatie voor voorlichtingsdoeleinden, en is met name gericht op de informatie die noodzakelijkerwijs door de instellingen voor HO moet worden aangeleverd. De HOVI-infrastructuur levert een gestandaardiseerd systeem voor informatie-overdracht over onderwijsinstellingen, opleidingen en evenementen in het Hoger Onderwijs.