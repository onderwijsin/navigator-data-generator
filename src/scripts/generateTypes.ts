import { useConfig } from "../lib/use-config";
import { ofetch } from "ofetch";
import openapiTS, { astToString } from "openapi-typescript";

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const specsDir = path.join(__dirname, '../../specs');
const typesDir = path.join(__dirname, '../types');

const { hovi, kiesmbo } = useConfig();

async function processHovi () {
    try {
        const hoviOAS = await ofetch(hovi.oasUrl)
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(specsDir)) {
            fs.mkdirSync(specsDir, { recursive: true });
        }
        // Write the OAS to a file
        fs.writeFileSync(path.join(specsDir, 'hovi_oas.json'), JSON.stringify(hoviOAS, null, 2));

        // Generate TypeScript types from the OAS
        const ast = await openapiTS(hoviOAS);
        const contents = astToString(ast);

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(typesDir)) {
            fs.mkdirSync(typesDir, { recursive: true });
        }
        fs.writeFileSync(path.join(typesDir, 'hovi.d.ts'), contents);
    } catch (error) {
        console.error('Error is hovi typegen from OAS:', error);
    }
    
}

async function processKiesMBO () {
    try {
        const kiesmboOAS = await ofetch(kiesmbo.oasUrl, {
            headers: {
                // Authorization: `Bearer ${kiesmbo.token}`
                "accept": "application/vnd.oai.openapi+json",
                Authorization: `SharedAccessSignature token=\"${kiesmbo.sessionToken}\",refresh=\"true\"`,
            }
        })
       
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(specsDir)) {
            fs.mkdirSync(specsDir, { recursive: true });
        }
        // Write the OAS to a file
        fs.writeFileSync(path.join(specsDir, 'kiesmbo_oas.json'), JSON.stringify(kiesmboOAS, null, 2));

        // Generate TypeScript types from the OAS
        const ast = await openapiTS(kiesmboOAS);
        const contents = astToString(ast);

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(typesDir)) {
            fs.mkdirSync(typesDir, { recursive: true });
        }
        fs.writeFileSync(path.join(typesDir, 'kiesmbo.d.ts'), contents);
    } catch (error) {
        console.error('Error kiesmbo typegen from OAS:', error);
    }
    
}


await Promise.all([
    processHovi(),
    processKiesMBO()
])