import Content from "@components/Content";
import AnimatedWrapper from "@components/Content/AnimatedWrapper";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import { getAllContent } from "@lib/api";
import Config from "@utils/config";
import type { Post } from "@utils/types";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface Props {
  posts: Post[];
}

export default function BlogPostsPage({ posts }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const filteredPosts = posts.filter((post) =>
    `${post.meta.title} ${post.meta.lead}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <DefaultLayout>
      <Head>
        <title>Blog | {Config.appName}</title>
      </Head>
      <section>
        <PageTitle>All blog posts</PageTitle>
        <input
          className="block w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-md dark:border-gray-900 focus:ring-gray-900 focus:border-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-10"
          aria-label="Filter posts"
          placeholder="Filter..."
          type="search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filteredPosts.length ? (
          filteredPosts.map((post, i) => (
            <AnimatedWrapper key={i} count={i}>
              <Content content={post} />
            </AnimatedWrapper>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllContent("post");

  return {
    props: {
      posts,
    },
  };
};
