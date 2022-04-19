import Link from "@components/Link";
import MDXComponent from "@components/MDXComponent";
import PageTitle from "@components/PageTitle";
import type { Post } from "@utils/types";
import PostDate from "./PostDate";
import PostTags from "./PostTags";
import ReadingTime from "./ReadingTime";

interface Props {
  post: Post;
  full?: boolean;
  fadeUp?: boolean;
  id?: number;
}

export default function Post({ post, full = false, fadeUp = false, id = undefined }: Props) {
  return (
    <article
      className={[`mb-10`, fadeUp && "animate-fade-up opacity-0"].join(" ")}
      style={fadeUp && id ? { animationDelay: `${id * 100}ms`, animationFillMode: "forwards" } : undefined}
    >
      {full ? (
        <PageTitle>{post.meta.title}</PageTitle>
      ) : (
        <Link href={post.permalink}>
          <h1 className="text-2xl  text-gray-900 dark:text-gray-200 inline-block hover:underline font-bold">
            {post.meta.title}
          </h1>
        </Link>
      )}
      <header className="text-gray-500 dark:text-gray-400 text-sm flex flex-col sm:flex-row gap-5">
        <div className="flex gap-5">
          <PostDate post={post} />
          <ReadingTime data={post.readingTime} />
        </div>
        {full && <PostTags tags={post.meta.tags} />}
      </header>
      <section className="my-5">{full ? <MDXComponent code={post.code} /> : <p>{post.meta.lead}</p>}</section>
      <footer>{full ? <Link href="/blog">← Back</Link> : <Link href={post.permalink}>Read more →</Link>}</footer>
    </article>
  );
}
