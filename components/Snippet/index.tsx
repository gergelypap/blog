import PostDate from "@components/BlogPost/PostDate";
import PostTags from "@components/BlogPost/PostTags";
import Link from "@components/Link";
import MDX from "@components/MDX";
import PageTitle from "@components/PageTitle";
import type { Post, SnippetContent } from "@utils/types";

interface Props {
  snippet: SnippetContent;
  full?: boolean;
  fadeUp?: boolean;
  id?: number;
}

export default function Snippet({ snippet, full = false, fadeUp = false, id = undefined }: Props) {
  return (
    <article
      className={[`mb-10`, fadeUp && "animate-fade-up [animation-fill-mode:forwards] opacity-0"].join(" ")}
      style={fadeUp && id ? { animationDelay: `${id * 100}ms` } : undefined}
    >
      {full ? (
        <PageTitle>{snippet.meta.title}</PageTitle>
      ) : (
        <Link href={snippet.permalink}>
          <h1 className="text-2xl  text-gray-900 dark:text-gray-200 inline-block hover:underline font-bold">
            {snippet.meta.title}
          </h1>
        </Link>
      )}
      <header className="text-gray-600 dark:text-gray-400 text-sm flex flex-col sm:flex-row gap-5">
        <div className="flex gap-5">
          <PostDate post={snippet as Post} />
        </div>
        {full && <PostTags tags={snippet.meta.tags} />}
      </header>
      <section className="my-5">{full ? <MDX code={snippet.code} /> : <p>{snippet.meta.lead}</p>}</section>
      <footer>{full ? <Link href="/blog">← Back</Link> : <Link href={snippet.permalink}>Read more →</Link>}</footer>
    </article>
  );
}
