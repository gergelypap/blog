import Content from "@components/Content";
import SEO from "@components/Content/SEO";
import DefaultLayout from "@components/Layout/DefaultLayout";
import Config from "@utils/config";
import { allPosts, type Post } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  post: Post;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>
          {post.title} | {Config.appName}
        </title>
      </Head>
      <SEO content={post} />
      <Content content={post} full />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((post) => post.slug === params!.slug);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.permalink);

  return {
    paths,
    fallback: false,
  };
};
