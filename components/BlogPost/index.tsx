import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import type { Post } from "@utils/types";
import { MDXRemote } from "next-mdx-remote";
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
      className={[`mb-10`, fadeUp && "animate-fade-up [animation-fill-mode:forwards] opacity-0"].join(" ")}
      style={fadeUp && id ? { animationDelay: `${id * 100}ms` } : undefined}
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
      <header className="text-gray-600 dark:text-gray-400 text-sm flex flex-col sm:flex-row gap-5">
        <div className="flex gap-5">
          <PostDate post={post} />
          <ReadingTime data={post.readingTime} />
        </div>
        {full && <PostTags tags={post.meta.tags} />}
      </header>
      <section className="my-5">{full ? <MDXRemote {...post.source} /> : <p>{post.meta.lead}</p>}</section>
      <footer>{full ? <Link href="/blog">← Back</Link> : <Link href={post.permalink}>Read more →</Link>}</footer>
    </article>
  );
}
