import fs from 'fs';
import glob from 'glob';
import marked from 'marked';
import matter from 'gray-matter';
import path from 'path';
import { readFile, saveFile } from './files.js';

/// Parses a content file
const parseContentFile = (filename) => {
    const contents = readFile(filename);
    const parsed = matter(contents);
    const html = marked(parsed.content);

    return { ...parsed, html };
}

// Renders content into a template.
//
// Params:
//  * template - The html template used to render the content.
//  * title    - The title of the content page.
//  * date     - The publish data of the content page.
//  * content  - The converted html content of the markdown source.
const render = (template, title, date, content) => {
    return template
        .replace(/<!--Title-->/g, title)
        .replace(/<!--Date-->/g, date)
        .replace(/<!--Content-->/g, content);
}

// Derives the output file name from a content source file.
//
// Strips the file path and replaces the extension with .html
//
// Params:
//  * filePath - The file path of the source content file.
const getOutputFileName = filePath => {
    const basename = path.basename(filePath);
    const contentFileName =
        basename.substring(0, basename.indexOf('.')) + '.html';

    return contentFileName;
}

// Renders a content file as html and writes the file to disk.
//
// Params:
//  * sourceFilePath - The file path of the source content file.
//  * template       - The html template used to render the content.
//  * outputFilePath - The file path of the output file to write.
const generateContentFile = (sourceFilePath, template, outputFilePath) => {
    const content = parseContentFile(sourceFilePath);

    /* Get content data */
    const title = content.data.title;
    const date = content.data.date;
    const rendered = render(template, title, date, content.html);

    saveFile(outputFilePath, rendered);
}

// Renders content files from the source path using the supplied template and
//  writes the rendered output to the provided output path.
//
// Params:
//  * sourcePath   - The source path from which to read content files.
//  * templatePath - The path to the template used to render content.
//  * outputPath   - The destination path in which to write output.
const generateContent = (sourcePath, templatePath, outputPath) => {
    const template = readFile(templatePath);
    let contentList = [];

    const filePaths = glob.sync(sourcePath + '/**/**.md');
    filePaths.forEach(filePath => {
        const outputFileName = getOutputFileName(filePath);
        const outputFilePath = path.join(outputPath, outputFileName);
        generateContentFile(filePath, template, outputFilePath);
        contentList.push(outputFileName);
    })

    return contentList;
}

export { generateContent };
