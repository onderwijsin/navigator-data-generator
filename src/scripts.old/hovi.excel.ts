import dotenv from 'dotenv';
import type { Organization } from '../types';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Read all files from the output folder
const hoviOrganizations: Organization[] = [];

const directoryPathHoviOrgs = path.join(__dirname, '../../output/hovi/organizations');
const filesHOVI = fs.readdirSync(directoryPathHoviOrgs);

filesHOVI.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(directoryPathHoviOrgs, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const organization: Organization = JSON.parse(rawData);
        hoviOrganizations.push(organization);
    }
});

console.log(hoviOrganizations.length + ' HOVI organizations found');

const productList = hoviOrganizations.flatMap(org => org.products.map(product => ({
    ...product,
})));
