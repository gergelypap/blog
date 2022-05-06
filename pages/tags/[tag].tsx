import Content from "@components/Content";
import AnimatedWrapper from "@components/Content/AnimatedWrapper";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import Tag from "@components/Tag";
import { getPostsByTag } from "@lib/api";
import Config from "@utils/config";
import type { Post } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  content: {
    posts: Post[];
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
      {content.posts.length > 0 ? (
        content.posts.map((post, i) => (
          <AnimatedWrapper key={i} count={i}>
            <Content content={post} />
          </AnimatedWrapper>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tag = params!.tag;
  const posts = await getPostsByTag(tag);

  return {
    props: {
      content: {
        posts,
      },
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
