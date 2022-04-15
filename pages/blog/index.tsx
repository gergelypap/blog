import Post from "@components/Post";
import { getPosts } from "@lib/posts";
import { PostType } from "@type/Post";
import type { GetStaticProps } from "next";

interface Props {
  posts: PostType[];
}

export default function BlogPostsPage({ posts }: Props) {
  return (
    <section>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
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
