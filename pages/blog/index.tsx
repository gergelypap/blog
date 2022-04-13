import PostDate from "@components/Post/PostDate";
import PostTitle from "@components/Post/PostTitle";
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
          <article key={i} className="mb-10">
            <PostTitle post={post} clickable />
            <PostDate post={post} />
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

  // console.log(posts);
  posts.sort((a, b) => {
    return +new Date(b.meta.createdAt) - +new Date(a.meta.createdAt);
  });

  return {
    props: {
      posts,
    },
  };
};
