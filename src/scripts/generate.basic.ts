/** 
 * This is a special script for Wolf to generate a basic version of the data
 * so he can select relevant CROHO codes!
 */

import * as fs from 'fs';
import * as path from 'path';

import { useRawHovi } from '../lib/use-hovi';
import ExcelJS from 'exceljs';

// Ensure the directory exists
function ensureDirSync(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const { locations, organizations, products, degrees } = await useRawHovi();
const outputDir = path.join(process.cwd(), './output/hovi');
ensureDirSync(outputDir)

const prettyOrgs = organizations.map(org => ({
    organizationId: org.organization.organizationId,
    name: org.organization.brinName?.nl || org.organization.brinName?.en || '',
    brin: org.organization.brin,
    type: org.organization.organizationType,
    shortCode: org.organization.shortCode,
    mainLocation: org.organization.mainLocation,
    vendor: org.organization.vendor,
}))

const prettyLocs = locations.map(loc => ({
    locationId: loc.locationId,
    locationName: loc.locationName?.nl || loc.locationName?.en || '',
    city: loc.courseCityName,
    locationType: loc.locationType,
    brinVolg: loc.brinVolg,
    organizationId: loc.organization,
    visitorAddress: loc.visitorAddress,
}))

const prettyProducts = products.map(product => ({
    productId: product.productId,
    croho: product.croho,
    crohoName: product.crohoName?.nl || product.crohoName?.en || '',
    crohoSector: product.crohoSector,
    productName: product.productName?.nl || product.productName?.en || '',
    productLevel: product.productLevel,
    productType: product.productType,
    productForms: product.productForms?.map(form => form.productForm).join(', '),
    programLevel: product.programLevel,
    degrees: product.degrees?.map(degree => degrees.find(d => d.rowkey === degree)?.title?.nl || '').join(', '),
    credits: product.credits,
    accreditations: (product.accreditations || []).map(acc => acc.accrOrganization).join(', '),
    financing: product.financing,
    locationId: product.location,
    opleidingSK123Id: product.opleidingSK123Id,
    organizationId: product.organization,
}))


const workbook = new ExcelJS.Workbook();

// Add organizations sheet
const orgSheet = workbook.addWorksheet('Organizations');
orgSheet.columns = Object.keys(prettyOrgs[0] as Record<string, any>).map(key => ({ header: key, key }));
prettyOrgs.forEach(org => orgSheet.addRow(org));

// Add products sheet
const productSheet = workbook.addWorksheet('Products');
productSheet.columns = Object.keys(prettyProducts[0] as Record<string, any>).map(key => ({ header: key, key }));
prettyProducts.forEach(product => productSheet.addRow(product));

// Add locations sheet
const locationSheet = workbook.addWorksheet('Locations');
locationSheet.columns = Object.keys(prettyLocs[0] as Record<string, any>).map(key => ({ header: key, key }));
prettyLocs.forEach(location => locationSheet.addRow(location));

// Write the workbook to a file
await workbook.xlsx.writeFile(path.resolve(outputDir, 'data.xlsx'));

console.log('Data written to data.xlsx');