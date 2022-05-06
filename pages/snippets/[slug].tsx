import Content from "@components/Content";
import SEO from "@components/Content/SEO";
import DefaultLayout from "@components/Layout/DefaultLayout";
import { getContentBySlug, getSlugs } from "@lib/api";
import Config from "@utils/config";
import type { SnippetContent } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  snippet: SnippetContent;
}

export default function SnippetPage({ snippet }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>
          {snippet.meta.title} | {Config.appName}
        </title>
      </Head>
      <SEO content={snippet} />
      <Content content={snippet} full />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const snippet = (await getContentBySlug(params!.slug, "snippet")) as SnippetContent;

  return {
    props: {
      snippet,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getSlugs("snippet").map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
