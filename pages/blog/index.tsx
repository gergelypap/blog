import { getPosts } from "@lib/posts";
import type { GetStaticProps } from "next";
import Link from "next/link";

export default function BlogPostsPage({ posts }) {
  return (
    <section>
      {posts.map((post, i) => {
        return (
          <article key={i}>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <h1>{post.data.title}</h1>
                <p>{post.data.lead}</p>
              </a>
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
