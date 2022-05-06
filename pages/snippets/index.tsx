import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import Snippet from "@components/Snippet";
import { getAllContent } from "@lib/api";
import Config from "@utils/config";
import { SnippetContent } from "@utils/types";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  snippets: SnippetContent[];
}

export default function BlogPostsPage({ snippets }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>Snippets | {Config.appName}</title>
      </Head>
      <section>
        <PageTitle>All snippets</PageTitle>

        {snippets.length ? (
          snippets.map((snippet, i) => <Snippet key={i} id={++i} snippet={snippet} fadeUp />)
        ) : (
          <p>No snippets found.</p>
        )}
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const snippets = await getAllContent("snippet");

  return {
    props: {
      snippets,
    },
  };
};
