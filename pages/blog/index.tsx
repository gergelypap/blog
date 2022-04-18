import Post from "@components/Post";
import { getPosts } from "@lib/posts";
import { PostType } from "@type/Post";
import { APP_NAME } from "@utils/constants";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface Props {
  posts: PostType[];
}

export default function BlogPostsPage({ posts }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const filteredPosts = posts.filter((post) =>
    `${post.meta.title} ${post.meta.lead}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog / {APP_NAME}</title>
      </Head>
      <section>
        <input
          className="block w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-md dark:border-gray-900 focus:ring-gray-900 focus:border-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-10"
          aria-label="Filter posts"
          placeholder="Filter posts..."
          type="search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!filteredPosts.length && <p>No posts found.</p>}
        {filteredPosts.map((post, i) => (
          <Post key={i} id={i + 1} post={post} fadeUp />
        ))}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};
