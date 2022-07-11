import Content from "@components/Content";
import AnimatedWrapper from "@components/Content/AnimatedWrapper";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import SnippetBox from "@components/Snippet/SnippetBox";
import Config from "@utils/config";
import { allPosts, allSnippets, type Post, type Snippet } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
  snippets: Snippet[];
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
              <SnippetBox content={snippet} />
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
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));
  const snippets = allSnippets.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return {
    props: {
      posts,
      snippets,
    },
  };
};
