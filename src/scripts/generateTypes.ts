import { useConfig } from "../composables/use-config";
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


const pascalToCamelOrLowercase = (str: string): string => {
    // Check if the string is entirely uppercase
    if (str === str.toUpperCase()) {
        return str.toLowerCase(); // Convert to lowercase
    }
    // Convert PascalCase to camelCase
    return str.charAt(0).toLowerCase() + str.slice(1);
};
  
const transformComponentProps = (components: Record<string, any>): Record<string, any> => {
    // Iterate over schemas, securitySchemes, or any top-level component categories
    Object.keys(components).forEach((componentCategory) => {
        const schemas = components[componentCategory];
        // Iterate over each schema/component (e.g., FullExport, School)
        Object.keys(schemas).forEach((componentName) => {
            const component = schemas[componentName];
            if (component.properties) {
                // Transform only the properties object keys
                const updatedProperties: Record<string, any> = {};
                Object.keys(component.properties).forEach((propName) => {
                    const newPropName = pascalToCamelOrLowercase(propName);
                    updatedProperties[newPropName] = transformComponentProps(component.properties[propName]); // Recursively transform nested properties
                });
                component.properties = updatedProperties;
            }
        });
    });
    return components;
};

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

        // Next we'll need to work some magic to get the OAS to be valid
        // The issue lies in the PascalCasing of the OAS components, which does not represent the actual data (which is camelCased)
        const components = kiesmboOAS.components;
        const updatedComponents = transformComponentProps(components);

        // Update the OAS with the transformed components
        kiesmboOAS.components = updatedComponents;


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