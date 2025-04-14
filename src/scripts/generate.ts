import minimist from 'minimist';
import z from 'zod';

import * as fs from 'fs';
import * as path from 'path';

import { useRawHoviData } from '../utils/extractHovi';
import ExcelJS from 'exceljs';

// Ensure the directory exists
function ensureDirSync(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const args = minimist(process.argv.slice(2), {
  string: ['vendor', 'output', 'outDir'],
  default: {
    output: 'json',
    outDir: './output'
  }
});

const vendors = args.vendor?.split(',') ?? [];
const output = args.output?.split(',') ?? [];;
const outDir = args.outDir;

const schema = z.object({
    vendor: z.array(z.enum(['kiesmbo', 'hovi'])),
    output: z.array(z.enum(['json', 'excel'])),
    outDir: z.string()
});

const parsedArgs = schema.safeParse({
    vendor: vendors,
    output,
    outDir
});
if (!parsedArgs.success) {
    console.error('Invalid arguments:', JSON.stringify(parsedArgs.error.format(), null, 2));
    process.exit(1);
}
const { vendor, output: outputFormat, outDir: out } = parsedArgs.data;

const outputDir = path.join(process.cwd(), out);

if (vendor.length === 0) {
    console.error('No vendor specified. Use --vendor to specify one or more vendors.');
    process.exit(1);
}
ensureDirSync(outputDir)

if (vendor.includes('hovi')) {
    const { locations, organizations, products } = await useRawHoviData();

    if (outputFormat.includes('json')) {
        // Ensure directories exist
        ensureDirSync(path.resolve(outputDir, 'locations'));
        ensureDirSync(path.resolve(outputDir, 'organizations'));
        ensureDirSync(path.resolve(outputDir, 'products'));
        
        // First write the locations to a file
        fs.writeFileSync(path.resolve(outputDir, `locations/locations.json`), JSON.stringify(locations, null, 2));
        // Then write the organizations to a file
        fs.writeFileSync(path.resolve(outputDir, `organizations/organizations.json`), JSON.stringify(organizations, null, 2));
        // Then write the products to a file
        fs.writeFileSync(path.resolve(outputDir, `products/products.json`), JSON.stringify(products, null, 2));

        // For redundancy, write each organization including related products and locations to a separate file
        for (const org of organizations) {
            fs.writeFileSync(path.resolve(outputDir, `organizations/organization_${org.organization.organizationId}.json`), JSON.stringify(org, null, 2));
        }
    }
    if (outputFormat.includes('excel')) {
        const organizationsWithOnlyDetails = organizations.map(org => org.organization)

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
        await workbook.xlsx.writeFile(path.resolve(outputDir, 'data.xlsx'));
    }
}

if (vendor.includes('kiesmbo')) {
    console.log('KiesMBO data extraction is not implemented yet.');
    process.exit(1);
}