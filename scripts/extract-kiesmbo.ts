import { generateJSON } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import dotenv from 'dotenv';
import fs from 'fs';
import {ofetch} from 'ofetch'

import type { paths } from '../kiesmbo'

import type { Product, ProductForm, Organization, Location } from '../types';

// Load environment variables from .env file
dotenv.config();
const token = process.env.KIESMBO_TOKEN as string;

const response: paths['/api/v2/export']['get']['responses']['200']['content'] = await ofetch('https://gateway.s-bb.nl/kiesmbo/api/v2/export', {
    headers: {
        'Ocp-Apim-Subscription-Key': token,
    }
})

fs.writeFileSync('../output/kiesmbo/export/export_v2.json', JSON.stringify(response, null, 2));

