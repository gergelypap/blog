import PostContent from "@components/Post/PostContent";
import PostDate from "@components/Post/PostDate";
import PostTitle from "@components/Post/PostTitle";
import { getPostBySlug, getPostSlugs } from "@lib/posts";
import { Post } from "@type/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <article>
      <header>
        <PostTitle post={post} />
        <PostDate post={post} />
      </header>
      <section>
        <PostContent mdxCode={post.code} />
      </section>
      <footer>
        <Link href="/blog">
          <a>← Back</a>
        </Link>
      </footer>
    </article>
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
