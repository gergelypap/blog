import { getPosts } from "@lib/posts";
import type { GetStaticProps } from "next";
import Link from "next/link";

export default function BlogPostsPage({ posts }) {
  return (
    <section>
      {posts.map((post, i: number) => {
        return (
          <article key={i}>
            <Link href={`/blog/${post.slug}`}>
              <a className="text-inherit hover:no-underline">
                <h1 className="text-2xl font-bold mb-5">{post.data.title}</h1>
              </a>
            </Link>
            <p>{post.data.lead}</p>
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
