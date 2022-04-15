import PageTitle from "@components/PageTitle";
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
      <PageTitle text="Latest posts" />
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
