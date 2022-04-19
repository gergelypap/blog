import BlogPost from "@components/BlogPost";
import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { APP_NAME, APP_URL } from "@utils/constants";
import type { Post } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";

interface Props {
  post: Post;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <>
      <Head>
        <title>
          {post.meta.title} / {APP_NAME}
        </title>
      </Head>
      <NextSeo
        title={post.meta.title}
        titleTemplate={`%s | ${APP_NAME}`}
        description={post.meta.lead}
        canonical={`${APP_URL}${post.permalink}`}
        openGraph={{
          site_name: APP_NAME,
          url: `${APP_URL}${post.permalink}`,
          title: post.meta.title,
          description: post.meta.lead,
        }}
      />
      <BlogPost post={post} full />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getPostBySlug(params!.slug);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getPostSlugs().map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
