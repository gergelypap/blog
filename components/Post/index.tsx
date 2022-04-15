import MDXComponent from "@components/MDXComponent";
import { PostType } from "@type/Post";
import Link from "next/link";
import PostCategory from "./PostCategory";
import PostDate from "./PostDate";
import PostTitle from "./PostTitle";
import ReadingTime from "./ReadingTime";

interface Props {
  post: PostType;
  full?: boolean;
}

export default function Post({ post, full = false }: Props) {
  return (
    <article className="mb-10">
      <PostTitle post={post} clickable={!full} />
      <header className="text-gray-400 text-sm">
        <PostDate post={post} showUpdated={full} />
        <ReadingTime data={post.readingTime} />
        {full && <PostCategory tags={post.meta.tags} />}
      </header>
      <section className="my-5">{full ? <MDXComponent code={post.code} /> : <p>{post.meta.lead}</p>}</section>
      <footer>
        {full ? (
          <Link href="/blog">
            <a>← Back</a>
          </Link>
        ) : (
          <Link href={post.permalink}>
            <a>Read more →</a>
          </Link>
        )}
      </footer>
    </article>
  );
}
