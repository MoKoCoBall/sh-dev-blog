import { serialize } from "next-mdx-remote/serialize";
import rehypePrismPlus from "rehype-prism-plus";

export async function serializeMdx(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
    },
  });

  return mdxSource;
}
