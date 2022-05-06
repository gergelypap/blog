import Content from "@components/Content";
import AnimatedWrapper from "@components/Content/AnimatedWrapper";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import { getAllContent } from "@lib/api";
import Config from "@utils/config";
import type { Post, SnippetContent } from "@utils/types";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
  snippets: SnippetContent[];
}

export default function Home({ posts, snippets }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>{Config.appName}</title>
      </Head>
      <PageTitle>Latest blog posts</PageTitle>
      {posts.length ? (
        <section className="sm:grid sm:grid-cols-2 sm:gap-10">
          {posts.map((post, i) => (
            <AnimatedWrapper key={i} count={i}>
              <Content content={post} />
            </AnimatedWrapper>
          ))}
        </section>
      ) : (
        <p>No posts yet.</p>
      )}
      <PageTitle>Latest snippets</PageTitle>
      {snippets.length ? (
        <section className="sm:grid sm:grid-cols-3 sm:gap-10">
          {snippets.map((snippet, i) => (
            <AnimatedWrapper key={i} count={i}>
              <Content content={snippet} />
            </AnimatedWrapper>
          ))}
        </section>
      ) : (
        <p>No snippets yet.</p>
      )}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await getAllContent("post", 4)) as Post[];
  const snippets = (await getAllContent("snippet", 3)) as SnippetContent[];

  return {
    props: {
      posts,
      snippets,
    },
  };
};
