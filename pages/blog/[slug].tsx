import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

export default function BlogPostPage({ post }) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">{post.data.title}</h1>
      <MDXRemote {...post.source} />
      <Link href="/blog">
        <a>← Back</a>
      </Link>
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
