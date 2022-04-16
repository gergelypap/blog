import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import { getPostsByTag } from "@lib/posts";
import { APP_NAME, TAGS } from "@utils/constants";
import { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  tags: [string, number][];
}

export default function TagsListingPage({ tags }: Props) {
  return (
    <>
      <Head>
        <title>Tags / {APP_NAME}</title>
      </Head>
      <PageTitle text="Tags" />
      <section className="flex flex-wrap gap-5">
        {tags.map(([tag, count]) => (
          <Link
            className="bg-gray-300 rounded-full text-gray-600 dark:bg-gray-700 dark:text-gray-300 py-1 px-2 text-sm  hover:ring-2 ring-gray-400 hover:no-underline transition-all"
            key={tag}
            href={`/tags/${tag}`}
          >
            {tag} ({count})
          </Link>
        ))}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const tags: { [key: string]: number } = {};
  for (const tag of TAGS) {
    tags[`${tag}`] = (await getPostsByTag(tag)).length;
  }

  return {
    props: {
      tags: Object.entries(tags),
    },
  };
};
