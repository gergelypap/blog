import DefaultLayout from "@components/Layout/DefaultLayout";
import Snippet from "@components/Snippet";
import { getContentBySlug, getSlugs } from "@lib/api";
import Config from "@utils/config";
import type { SnippetContent } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
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

      <NextSeo
        title={snippet.meta.title}
        titleTemplate={`%s | ${Config.appName}`}
        description={snippet.meta.lead}
        canonical={`${Config.appUrl}${snippet.permalink}`}
        openGraph={{
          site_name: Config.appName,
          url: `${Config.appUrl}${snippet.permalink}`,
          title: snippet.meta.title,
          description: snippet.meta.lead,
          images: [
            {
              url: `${Config.appUrl}/img/default-thumbnail.jpg`,
              width: 1145,
              height: 599,
              alt: snippet.meta.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={`${Config.appUrl}${snippet.permalink}`}
        title={snippet.meta.title}
        images={[`${Config.appUrl}/img/default-thumbnail.jpg`]}
        datePublished={snippet.meta.createdAt}
        dateModified={snippet.meta.updatedAt || undefined}
        authorName="Gergely Pap"
        description={snippet.meta.lead}
      />
      <Snippet snippet={snippet} full />
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
