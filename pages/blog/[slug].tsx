import BlogPost from "@components/BlogPost";
import DefaultLayout from "@components/Layout/DefaultLayout";
import { getPostBySlug, getPostSlugs } from "@lib/posts";
import Config from "@utils/config";
import type { Post } from "@utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
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

      <NextSeo
        title={post.meta.title}
        titleTemplate={`%s | ${Config.appName}`}
        description={post.meta.lead}
        canonical={`${Config.appUrl}${post.permalink}`}
        openGraph={{
          site_name: Config.appName,
          url: `${Config.appUrl}${post.permalink}`,
          title: post.meta.title,
          description: post.meta.lead,
          images: [
            {
              url: `${Config.appUrl}${post.thumbnail.src}`,
              width: post.thumbnail.width,
              height: post.thumbnail.height,
              alt: post.meta.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={`${Config.appUrl}${post.permalink}`}
        title={post.meta.title}
        images={[`${Config.appUrl}${post.thumbnail.src}`]}
        datePublished={post.meta.createdAt}
        dateModified={post.meta.updatedAt || undefined}
        authorName="Gergely Pap"
        description={post.meta.lead}
      />
      <BlogPost post={post} full />
    </DefaultLayout>
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
