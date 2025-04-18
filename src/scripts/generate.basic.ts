/** 
 * This is a special script for Wolf to generate a basic version of the data
 * so he can select relevant CROHO codes!
 */

import * as fs from 'fs';
import * as path from 'path';

import { useRawHovi } from '../composables/use-hovi';
import ExcelJS from 'exceljs';

// Ensure the directory exists
function ensureDirSync(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const { _locations, _organizations, _products, _degrees } = await useRawHovi();
const outputDir = path.join(process.cwd(), './output/hovi');
ensureDirSync(outputDir)

const prettyOrgs = _organizations.map(org => ({
    organizationId: org.organizationId,
    name: org.brinName?.nl || org.brinName?.en || '',
    brin: org.brin,
    type: org.organizationType,
    shortCode: org.shortCode,
    mainLocation: org.mainLocation
}))

const prettyLocs = _locations.map(loc => ({
    locationId: loc.locationId,
    locationName: loc.locationName?.nl || loc.locationName?.en || '',
    city: loc.courseCityName,
    locationType: loc.locationType,
    brinVolg: loc.brinVolg,
    organizationId: loc.organization,
    visitorAddress: loc.visitorAddress,
}))

const prettyProducts = _products.map(product => ({
    productId: product.productId,
    croho: product.croho,
    crohoName: product.crohoName?.nl || product.crohoName?.en || '',
    crohoSector: product.crohoSector,
    productName: product.productName?.nl || product.productName?.en || '',
    productLevel: product.productLevel,
    productType: product.productType,
    productForms: product.productForms?.map(form => form.productForm).join(', '),
    programLevel: product.programLevel,
    degrees: product.degrees?.map(degree => _degrees?.find(d => d.rowkey === degree)?.title?.nl || '').join(', '),
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