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

export default function CategoryPage({ content, tag }: Props) {
  return (
    <>
      <Head>
        <title>
          Category: {tag} / {APP_NAME}
        </title>
      </Head>
      <PageTitle text={`Category: ${tag}`} />
      <h1>Posts ({content.posts.length})</h1>
      {content.posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
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
