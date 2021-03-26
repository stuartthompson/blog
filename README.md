# Markdown Weblog

Create a static blog site from markdown files.

Includes support for mermaidjs.

## Architecture

Uses two html templates (one for index, another for a post) to build a static
HTML site from Markdown content. Apply whatever styling is necessary via CSS
in the template files. The content of posts, title, date, and author will be
replaced within the template file during generation. Very simple.

### Design

The following diagram illustrates the basic workflow used to assemble the blog
site.

```mermaid
graph TD;
    Weblog;
    BuildSite[Build blog site];
    MDFiles{{Enumerate markdown files}};
    ReadIndexTemplate[Read index template];
    ReadContentTemplate[Read content template];
    BuildIndexPage[Build index page];
    ContentTemplate{{Content template}};
    IndexTemplate{{Index template}};
    MDContent{{Page content}};
    ContentIndex{{Content index}};
    ParseContent[Parse markdown content];
    HeaderInfo{{Header: title, author, date}};
    PageContent{{Page content}};
    BuildContentPage[Build content page];
    MermaidDiagrams{{Mermaid diagrams}};
    ContentPages{{Content pages}};
    IndexPage{{Index page}};
    AssembleSite[Assemble site];
    OutputSite[Output site];

    Weblog-->BuildSite;

    subgraph BuildSiteSG[Build site]
        BuildSite-->ReadIndexTemplate;
        BuildSite-->MDFiles;
        BuildSite-->ReadContentTemplate;
    end;

    subgraph BuildIndexSG[Build index page]
        MDFiles--for each-->ContentIndex;
        ContentIndex-->BuildIndexPage;
        ReadIndexTemplate-->IndexTemplate;
        IndexTemplate-->BuildIndexPage;
    end;

    subgraph BuildContentPagesSG[Build content pages]
        MDFiles--for each-->MDContent;
        MDContent-->ParseContent;
        ParseContent-->HeaderInfo;
        ParseContent-->PageContent;
        ParseContent-->MermaidDiagrams;
        ReadContentTemplate-->ContentTemplate;
        ContentTemplate-->BuildContentPage;
        HeaderInfo-->BuildContentPage;
        PageContent-->BuildContentPage;
        MermaidDiagrams-->BuildContentPage;
    end;
    
    subgraph AssembleSiteSG[Assemble site]
        BuildIndexPage-->IndexPage;
        BuildContentPage-->ContentPages;
        IndexPage-->AssembleSite;
        ContentPages-->AssembleSite;
    end;

    AssembleSite-->OutputSite;
```

### Libraries

This package uses the following libraries:

* [Marked](https://www.npmjs.com/package/marked) - Used to parse the markdown
content and convert it to HTML.
* [MermaidJS](https://www.npmjs.com/package/mermaid) - Used to parse mermaid
diagram content and convert it to SVG.
