import { getParsedData } from "@/lib/getParsedData";
import Comments from "./comment";

export interface BlogPostProps {
  params: {
    slug: string;
  };
}

export interface PostData {
  title: string;
  preview?: string;
  slug: string;
}

export async function generateMetadata(props: BlogPostProps) {
  const params = await Promise.resolve(props.params);
  const { data } = await getParsedData(params.slug);

  return {
    title: data.title,
    openGraph: {
      title: data.title,
    },
  };
}

export default async function BlogPost(props: BlogPostProps) {
  try {
    const params = await Promise.resolve(props.params);
    const slug = params.slug;
    const { data, contentHtml } = await getParsedData(slug);

    return (
      <div className="flex justify-center py-8">
        <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
          <div className="mb-12 pb-8 border-b border-gray-200 dark:border-zinc-800">
            <div className="text-6xl mb-8">{data.emoji}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {data.title}
            </h1>
            {data.preview && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {data.preview}
              </p>
            )}
          </div>

          <article
            className="prose dark:prose-invert max-w-none mb-8"
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="text-center text-red-500 mt-8">
        데이터를 불러오는 데 실패했습니다.
      </div>
    );
  }
}
