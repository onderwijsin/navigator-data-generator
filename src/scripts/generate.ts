import minimist from 'minimist';
import z from 'zod';

import * as fs from 'fs';
import * as path from 'path';

import { useRawHovi, useHovi } from '../lib/use-hovi';
import { useRawKiesMbo, useKiesMbo } from '../lib/use-kiesmbo';
import ExcelJS from 'exceljs';

import { logger } from '../lib/use-errors';
import { c } from 'openapi-typescript';
// Ensure the directory exists
function ensureDirSync(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const args = minimist(process.argv.slice(2), {
  string: ['vendor', 'output', 'outDir'],
  boolean: ['raw', 'croho'], // 👈 declare it as a boolean
  default: {
    output: 'json',
    outDir: './output',
    raw: false,
    filter: false
  }
});

const vendors = args.vendor?.split(',') ?? [];
const output = args.output?.split(',') ?? [];;
const outDir = args.outDir;
const raw = args.raw;
const filter = args.filter;

const schema = z.object({
    vendor: z.array(z.enum(['kiesmbo', 'hovi'])),
    output: z.array(z.enum(['json', 'excel'])),
    outDir: z.string(),
    raw: z.boolean(),
    filter: z.boolean()
});

const parsedArgs = schema.safeParse({
    vendor: vendors,
    output,
    outDir,
    raw,
    filter
});
if (!parsedArgs.success) {
    console.error('Invalid arguments:', JSON.stringify(parsedArgs.error.format(), null, 2));
    process.exit(1);
}
const { vendor, output: outputFormat, outDir: out, raw: isRaw, filter: useFilter } = parsedArgs.data;

const outputDir = path.join(process.cwd(), out);

if (vendor.length === 0) {
    console.error('No vendor specified. Use --vendor to specify one or more vendors.');
    process.exit(1);
}
ensureDirSync(outputDir)

if (vendor.includes('hovi')) {
    const { _locations: locations, _organizations: organizations, _products: products } = isRaw ? await useRawHovi({filterByCrohoCodes: useFilter}) : await useHovi({filterByCrohoCodes: useFilter});

    if (!organizations.length) {
        console.error('No organizations found');
        process.exit(1);
    }
    const hoviDir = path.resolve(outputDir, 'hovi');

    if (outputFormat.includes('json')) {
        // Ensure directories exist
        ensureDirSync(path.resolve(hoviDir, 'locations'));
        ensureDirSync(path.resolve(hoviDir, 'organizations'));
        ensureDirSync(path.resolve(hoviDir, 'products'));
        
        // First write the locations to a file
        fs.writeFileSync(path.resolve(hoviDir, `locations/locations.json`), JSON.stringify(locations, null, 2));
        // Then write the organizations to a file
        fs.writeFileSync(path.resolve(hoviDir, `organizations/organizations.json`), JSON.stringify(organizations, null, 2));
        // Then write the products to a file
        fs.writeFileSync(path.resolve(hoviDir, `products/products.json`), JSON.stringify(products, null, 2));

        // For redundancy, write each organization including related products and locations to a separate file
        for (const org of organizations) {
            fs.writeFileSync(path.resolve(hoviDir, `organizations/organization_${
                'organizationId' in org ? org.organizationId : 'hovi_id' in org ? org.hovi_id : 'unknown'
            }.json`), JSON.stringify(org, null, 2));
        }

        console.log('JSON data written to files');
    }
    if (outputFormat.includes('excel')) {
        const organizationsWithOnlyDetails = organizations.map(org => 'organization' in org ? org.organization : org);

        const workbook = new ExcelJS.Workbook();

        // Add organizations sheet
        const orgSheet = workbook.addWorksheet('Organizations');
        orgSheet.columns = Object.keys(organizationsWithOnlyDetails[0] as Record<string, any>).map(key => ({ header: key, key }));
        organizationsWithOnlyDetails.forEach(org => orgSheet.addRow(org));

        // Add products sheet
        const productSheet = workbook.addWorksheet('Products');
        productSheet.columns = Object.keys(products[0] as Record<string, any>).map(key => ({ header: key, key }));
        products.forEach(product => productSheet.addRow(product));

        // Add locations sheet
        const locationSheet = workbook.addWorksheet('Locations');
        locationSheet.columns = Object.keys(locations[0] as Record<string, any>).map(key => ({ header: key, key }));
        locations.forEach(location => locationSheet.addRow(location));

        // Write the workbook to a file
        await workbook.xlsx.writeFile(path.resolve(hoviDir, 'data.xlsx'));

        console.log('Excel data written to data.xlsx');
    }
}

if (vendor.includes('kiesmbo')) {
    const { _locations: locations, _organizations: organizations, _products: products } = isRaw ? await useRawKiesMbo({ filterByCreboCodes: useFilter, filterByStudyNumbers: useFilter }) : await useKiesMbo({ filterByCreboCodes: useFilter, filterByStudyNumbers: useFilter });

    const kiesMboDir = path.resolve(outputDir, 'kiesmbo');
    if (outputFormat.includes('json')) {
        ensureDirSync(path.resolve(kiesMboDir, 'locations'));
        ensureDirSync(path.resolve(kiesMboDir, 'organizations'));
        ensureDirSync(path.resolve(kiesMboDir, 'products'));

        // First write the locations to a file
        fs.writeFileSync(path.resolve(kiesMboDir, `locations/locations.json`), JSON.stringify(locations, null, 2));
        // Then write the organizations to a file
        fs.writeFileSync(path.resolve(kiesMboDir, `organizations/organizations.json`), JSON.stringify(organizations, null, 2));
        // Then write the products to a file
        fs.writeFileSync(path.resolve(kiesMboDir, `products/products.json`), JSON.stringify(products, null, 2));

        // For redundancy, write each organization including related products and locations to a separate file
        for (const org of organizations) {
            fs.writeFileSync(path.resolve(kiesMboDir, `organizations/organization_${
                'organization_id' in org ? org.organization_id : 'unknown'
            }.json`), JSON.stringify(org, null, 2));
        }

        console.log('JSON data written to files');
    }
    if (outputFormat.includes('excel')) {
        const organizationsWithOnlyDetails = organizations.map(org => 'organization' in org ? org.organization : org);

        const workbook = new ExcelJS.Workbook();

        // Add organizations sheet
        const orgSheet = workbook.addWorksheet('Organizations');
        orgSheet.columns = Object.keys(organizationsWithOnlyDetails[0] as Record<string, any>).map(key => ({ header: key, key }));
        organizationsWithOnlyDetails.forEach(org => orgSheet.addRow(org));

        // Add products sheet
        const productSheet = workbook.addWorksheet('Products');
        productSheet.columns = Object.keys(products[0] as Record<string, any>).map(key => ({ header: key, key }));
        products.forEach(product => productSheet.addRow(product));

        // Add locations sheet
        const locationSheet = workbook.addWorksheet('Locations');
        locationSheet.columns = Object.keys(locations[0] as Record<string, any>).map(key => ({ header: key, key }));
        locations.forEach(location => locationSheet.addRow(location));

        // Write the workbook to a file
        await workbook.xlsx.writeFile(path.resolve(kiesMboDir, 'data.xlsx'));

        console.log('Excel data written to data.xlsx');
    }
}

if (!!vendor.length) {
    // Write the logs to a file
    fs.writeFileSync(path.resolve(outputDir, `logs_${Date.now()}.json`), JSON.stringify(logger.getLogs(), null, 2));
}