import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import mkdirp from 'mkdirp';
import glob from 'glob';

import { generateContent } from './render.js';

/* Main entry point */
const outputPath = 'site';
const contentSourcePath = 'pages';
const contentTemplatePath = 'templates/content.html';

/* Generate content files */
const contentList = 
    generateContent(contentSourcePath, contentTemplatePath, outputPath);

// Print content list
contentList.forEach(file => {
    console.log(`Content: ${file}`);
});

