import Content from "@components/Content";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import SnippetBox from "@components/Snippet/SnippetBox";
import Tag from "@components/Tag";
import { getContentByTag } from "@lib/api";
import Config from "@utils/config";
import type { Post, SnippetContent } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  content: {
    posts: Post[];
    snippets: SnippetContent[];
  };
  tag: string;
}

export default function TagsPage({ content, tag }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>
          Tags: {tag} | {Config.appName}
        </title>
      </Head>
      <PageTitle>
        Tagged as{" "}
        <Tag
          link={false}
          name={tag}
          className="!text-base -translate-y-1 ml-1 bg-gradient-to-br from-green-500 to-blue-500 !text-white"
        />
      </PageTitle>
      {content.posts.length > 0 && content.posts.map((post, i) => <Content key={i} content={post} />)}
      {content.snippets.length > 0 && (
        <section className="sm:grid sm:grid-cols-3 sm:gap-5">
          {content.snippets.map((snippet, i) => (
            <SnippetBox key={i} content={snippet} />
          ))}
        </section>
      )}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tag = params!.tag;
  const content = await getContentByTag(tag);

  return {
    props: {
      content,
      tag,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Config.tags.map((tag) => ({
    params: {
      tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
