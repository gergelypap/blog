import BlogPost from "@components/BlogPost";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import { getPosts } from "@lib/posts";
import Config from "@utils/config";
import type { Post } from "@utils/types";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>{Config.appName}</title>
      </Head>
      <PageTitle>Latest blog posts</PageTitle>
      {posts.length ? (
        <section className="sm:grid sm:grid-cols-2 sm:gap-10">
          {posts.map((post, i) => (
            <BlogPost key={i} post={post} id={++i} fadeUp />
          ))}
        </section>
      ) : (
        <p>No posts yet.</p>
      )}
    </DefaultLayout>
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
