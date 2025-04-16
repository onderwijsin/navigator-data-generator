import minimist from 'minimist';
import z from 'zod';

import * as fs from 'fs';
import * as path from 'path';

import { useRawHovi, useHovi } from '../composables/use-hovi';
import { useRawKiesMbo, useKiesMbo } from '../composables/use-kiesmbo';
import ExcelJS from 'exceljs';

import { logger } from '../composables/use-errors';

// Ensure the directory exists
function ensureDirSync(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const args = minimist(process.argv.slice(2), {
  string: ['vendor', 'output', 'outDir'],
  boolean: ['raw', 'filter'],
  default: {
    output: 'json',
    outDir: './output',
    raw: false,
    filter: false
  }
});

const schema = z.object({
    vendor: z.array(z.enum(['kiesmbo', 'hovi'])),
    output: z.array(z.enum(['json', 'excel'])),
    outDir: z.string(),
    raw: z.boolean(),
    filter: z.boolean()
});

const parsedArgs = schema.safeParse({
    vendor: args.vendor?.split(',') ?? [],
    output: args.output?.split(',') ?? [],
    outDir: args.outDir,
    raw: args.raw,
    filter: args.filter
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

// --- Helper functions ---

function writeJsonData(baseDir: string, locations: any[], organizations: any[], products: any[], orgIdKey: string) {
    ensureDirSync(path.resolve(baseDir, 'locations'));
    ensureDirSync(path.resolve(baseDir, 'organizations'));
    ensureDirSync(path.resolve(baseDir, 'products'));

    fs.writeFileSync(path.resolve(baseDir, 'locations/locations.json'), JSON.stringify(locations, null, 2));
    fs.writeFileSync(path.resolve(baseDir, 'organizations/organizations.json'), JSON.stringify(organizations, null, 2));
    fs.writeFileSync(path.resolve(baseDir, 'products/products.json'), JSON.stringify(products, null, 2));

    for (const org of organizations) {
        const orgId = orgIdKey in org ? org[orgIdKey] : 'unknown';
        fs.writeFileSync(
            path.resolve(baseDir, `organizations/organization_${orgId}.json`),
            JSON.stringify(org, null, 2)
        );
    }

    console.log('JSON data written to files');
}

async function writeExcelData(baseDir: string, locations: any[], organizations: any[], products: any[]) {
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

    await workbook.xlsx.writeFile(path.resolve(baseDir, 'data.xlsx'));

    console.log('Excel data written to data.xlsx');
}

// --- Main logic ---

async function handleVendor({
    vendorName,
    getData,
    orgIdKey,
}: {
    vendorName: string,
    getData: () => Promise<{ _locations: any[], _organizations: any[], _products: any[] }>,
    orgIdKey: string
}) {
    const { _locations: locations, _organizations: organizations, _products: products } = await getData();

    if (!organizations.length) {
        console.error('No organizatisons found');
        process.exit(1);
    }
    const vendorDir = path.resolve(outputDir, vendorName);

    if (outputFormat.includes('json')) {
        writeJsonData(vendorDir, locations, organizations, products, orgIdKey);
    }
    if (outputFormat.includes('excel')) {
        await writeExcelData(vendorDir, locations, organizations, products);
    }
}

if (vendor.includes('hovi')) {
    await handleVendor({
        vendorName: 'hovi',
        getData: () => isRaw
            ? useRawHovi({ filterByCrohoCodes: useFilter })
            : useHovi({ filterByCrohoCodes: useFilter }),
        orgIdKey: 'organizationId' // fallback to 'hovi_id' is handled in original, but you can adjust if needed
    });
}

if (vendor.includes('kiesmbo')) {
    await handleVendor({
        vendorName: 'kiesmbo',
        getData: () => isRaw
            ? useRawKiesMbo({ filterByCreboCodes: useFilter, filterByStudyNumbers: useFilter })
            : useKiesMbo({ filterByCreboCodes: useFilter, filterByStudyNumbers: useFilter }),
        orgIdKey: 'organization_id'
    });
}

if (!!vendor.length) {
    fs.writeFileSync(path.resolve(outputDir, `logs_${Date.now()}.json`), JSON.stringify(logger.getLogs(), null, 2));
}