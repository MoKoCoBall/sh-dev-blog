import { getParsedData } from "@/lib/getParsedData";
import Comments from "./comment";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const { data, contentHtml } = await getParsedData(slug);

  return (
    <div className="flex justify-center py-8">
      <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
        <div className="mb-12 pb-8 border-b border-gray-200 dark:border-zinc-800">
          <div className="text-6xl mb-8">{data.emoji}</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            {data.title}
          </h1>

          {data.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {data.description}
            </p>
          )}

          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-xl border border-gray-200 dark:border-zinc-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <article
          className="prose dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                     prose-headings:font-bold prose-headings:my-4 
                     prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-lg prose-img:mx-auto
                     prose-p:my-4 prose-ul:my-4 prose-ol:my-4
                     prose-code:px-1 prose-code:py-0.5 prose-code:bg-gray-100 dark:prose-code:bg-zinc-800 prose-code:rounded
                     prose-pre:bg-gray-100 dark:prose-pre:bg-zinc-800
                     max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 flex items-center">
            <span className="mr-2">💬</span> 댓글
          </h2>
          <Comments />
        </div>
      </div>
    </div>
  );
}
