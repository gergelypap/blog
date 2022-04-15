import PageTitle from "@components/PageTitle";
import Post from "@components/Post";
import { getPosts } from "@lib/posts";
import { PostType } from "@type/Post";
import { APP_NAME } from "@utils/constants";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  posts: PostType[];
}

export default function BlogPostsPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Blog / {APP_NAME}</title>
      </Head>
      <PageTitle text="All posts" />
      <section>
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </section>
    </>
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
