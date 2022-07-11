import AnimatedWrapper from "@components/Content/AnimatedWrapper";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import SnippetBox from "@components/Snippet/SnippetBox";
import Config from "@utils/config";
import { allSnippets, type Snippet } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  snippets: Snippet[];
}

export default function SnippetsPage({ snippets }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>Snippets | {Config.appName}</title>
      </Head>
      <section>
        <PageTitle>All snippets</PageTitle>
        {snippets.length ? (
          <section className="sm:grid sm:grid-cols-3 sm:gap-5">
            {snippets.map((snippet, i) => (
              <AnimatedWrapper key={i} count={i}>
                <SnippetBox content={snippet} />
              </AnimatedWrapper>
            ))}
          </section>
        ) : (
          <p>No snippets found.</p>
        )}
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const snippets = allSnippets.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return {
    props: {
      snippets,
    },
  };
};
