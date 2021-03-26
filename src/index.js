import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import mkdirp from 'mkdirp';
import glob from 'glob';

/// Reads a file from disk
const readFile = (filename) => {
    const contents = 
        fs.readFileSync(path.join(path.resolve(), filename), 'utf8');
    return contents;
}

/// Parses a content file
const parseContentFile = (filename) => {
    const contents = readFile(filename);
    const parsed = matter(contents);
    const html = marked(parsed.content);

    return { ...parsed, html };
}

/// Renders a content file into a template
const render = (template, title, date, content) => {
    return template
        .replace(/<!--Title-->/g, title)
        .replace(/<!--Date-->/g, date)
        .replace(/<!--Content-->/g, content);
}

/// Saves a file to disk
const saveFile = (filename, contents) => {
    const dir = path.dirname(filename);
    mkdirp.sync(dir);
    fs.writeFileSync(filename, contents);
}

/// Gets the filepath of a rendered content page
const getOutputFilepath = (filename, outputPath) => {
    const basename = path.basename(filename);
    const outputFilePath = 
        basename.substring(0, basename.indexOf('.')) + '.html';
    return path.join(outputPath, outputFilePath);
}

/// Generates the content files
const generateContent = (sourcePath, templatePath, outputPath) => {
    const template = readFile(templatePath);

    const filepaths = glob.sync(sourcePath + '/**/**.md');
    filepaths.forEach(filepath => {
        generateContentFile(filepath, template, outputPath);
    })
}

/// Generates a content file
const generateContentFile = (filepath, template, outputPath) => {
    const content = parseContentFile(filepath);

    /* Get content data */
    const title = content.data.title;
    const date = content.data.date;
    const rendered = render(template, title, date, content.html);

    const outputFilepath = getOutputFilepath(filepath, outputPath);
    saveFile(outputFilepath, rendered);
}

/* Main entry point */
const outputPath = 'site';
const contentSourcePath = 'pages';
const contentTemplatePath = 'templates/content.html';

/* Generate content files */
generateContent(contentSourcePath, contentTemplatePath, outputPath);

