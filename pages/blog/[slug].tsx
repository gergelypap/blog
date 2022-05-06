import BlogPost from "@components/BlogPost";
import SEO from "@components/Content/SEO";
import DefaultLayout from "@components/Layout/DefaultLayout";
import { getContentBySlug, getSlugs } from "@lib/api";
import Config from "@utils/config";
import type { Post } from "@utils/types";
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
          {post.meta.title} | {Config.appName}
        </title>
      </Head>
      <SEO content={post} />
      <BlogPost post={post} full />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = (await getContentBySlug(params!.slug, "post")) as Post;

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getSlugs("post").map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
