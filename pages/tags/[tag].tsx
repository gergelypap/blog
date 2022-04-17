import PageTitle from "@components/PageTitle";
import Post from "@components/Post";
import { getPostsByTag } from "@lib/posts";
import { PostType } from "@type/Post";
import { APP_NAME, TAGS } from "@utils/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  content: {
    posts: PostType[];
  };
  tag: string;
}

export default function TagsPage({ content, tag }: Props) {
  return (
    <>
      <Head>
        <title>
          Tags: {tag} / {APP_NAME}
        </title>
      </Head>
      <PageTitle>Tagged as: {tag}</PageTitle>
      {content.posts.length > 0 ? content.posts.map((post, i) => <Post key={i} post={post} />) : <p>No posts found.</p>}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const posts = await getPostsByTag(params!.tag);

  return {
    props: {
      content: {
        posts,
      },
      tag: params!.tag,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = TAGS.map((tag) => ({
    params: {
      tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
