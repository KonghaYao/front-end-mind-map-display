import { unified } from "unified";
import remarkToc from "remark-toc";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
export const createMarkdown = () =>
    unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkToc)
        .use(remarkSqueezeParagraphs)
        .use(remarkFrontmatter, ["yaml"])
        .use(remarkRehype)
        .use(rehypeStringify);
