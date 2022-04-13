import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { Post } from "@type/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

interface Props {
  post: Post;
}

type UrlParams = { slug: string };

export default function BlogPostPage({ post }: Props) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">{post.meta.title}</h1>
      <MDXRemote {...post.source} />
      <Link href="/blog">
        <a>← Back</a>
      </Link>
    </section>
  );
}

export const getStaticProps: GetStaticProps<Props, UrlParams> = async ({ params }) => {
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
