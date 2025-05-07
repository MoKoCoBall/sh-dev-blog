import Comments from "./comment";
import { getParsedData } from "@/lib/getParsedData";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { data, contentHtml } = await getParsedData(params.slug);

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-[60%] mx-auto">
        <div className="text-4xl">{data.emoji}</div>
        <div className="text-3xl font-bold">{data.title}</div>
        <div className="text-lg text-gray-600">{data.description}</div>
        <article
          className="prose dark:prose-invert prose-h1"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <Comments />
      </div>
    </div>
  );
}
