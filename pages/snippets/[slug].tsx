import Content from "@components/Content";
import SEO from "@components/Content/SEO";
import DefaultLayout from "@components/Layout/DefaultLayout";
import Config from "@utils/config";
import { allSnippets, type Snippet } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  snippet: Snippet;
}

export default function SnippetPage({ snippet }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>
          {snippet.title} | {Config.appName}
        </title>
      </Head>
      <SEO content={snippet} />
      <Content content={snippet} full />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params?.slug);

  return {
    props: {
      snippet,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allSnippets.map((snippet) => snippet.permalink);

  return {
    paths,
    fallback: false,
  };
};
