import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import rehypePrism from "rehype-prism-plus";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export async function getParsedData(slug: string) {
  const filePath = path.join(process.cwd(), "src", "posts", slug, "index.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return { data, contentHtml };
}
