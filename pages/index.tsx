import Post from "@components/Post";
import { getPosts } from "@lib/posts";
import type { PostType } from "@type/Post";
import { APP_NAME } from "@utils/constants";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  posts: PostType[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <h1 className="inline-block mb-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-extrabold text-3xl">
        Latest posts
      </h1>
      <section className="sm:grid sm:grid-cols-2 sm:gap-10">
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts(4);

  return {
    props: {
      posts,
    },
  };
};
