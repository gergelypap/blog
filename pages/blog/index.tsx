import { getPosts } from "@lib/posts";
import { Post } from "@type/Post";
import type { GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  posts: Post[];
}

export default function BlogPostsPage({ posts }: Props) {
  return (
    <section>
      {posts.map((post, i) => {
        return (
          <article key={i}>
            <Link href={`/blog/${post.slug}`}>
              <a className="text-inherit hover:no-underline">
                <h1 className="text-2xl font-bold mb-5">{post.meta.title}</h1>
              </a>
            </Link>
            <p>{post.meta.lead}</p>
            <Link href={`/blog/${post.slug}`}>
              <a>Read more →</a>
            </Link>
          </article>
        );
      })}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};
