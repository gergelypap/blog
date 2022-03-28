import { getPostBySlug, postFiles } from "@lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";

export default function BlogPostPage({ post }) {
  return (
    <section>
      <MDXRemote {...post.source} />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = postFiles.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
