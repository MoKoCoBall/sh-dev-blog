import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Comments from "./comment";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    params.slug,
    "index.md"
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div>
      <div>{data.title}</div>
      <div>{data.description}</div>
      <article
        className="prose dark:prose-invert prose-h1"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <Comments />
    </div>
  );
}
