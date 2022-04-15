import Post from "@components/Post";
import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { PostType } from "@type/Post";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  post: PostType;
}

export default function BlogPostPage({ post }: Props) {
  return <Post post={post} full />;
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
