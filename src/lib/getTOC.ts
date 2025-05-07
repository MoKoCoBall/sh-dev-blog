import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkSlug from "remark-slug";
import { visit } from "unist-util-visit";

export interface TocItem {
  value: string;
  id: string;
  depth: number;
}

export function getToc(markdown: string): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkSlug).parse(markdown);
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const depth = node.depth;
    const textNode = node.children.find((child: any) => child.type === "text");
    if (!textNode) return;
    const value = textNode.value;
    const id = value
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-+|-+$/g, "");

    toc.push({ value, id, depth });
  });

  return toc;
}
