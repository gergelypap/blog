import BlogPost from "@components/BlogPost";
import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { APP_NAME } from "@utils/constants";
import type { Post } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
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
