import PageTitle from "@components/PageTitle";
import { getPostsByTag } from "@lib/posts";
import { APP_NAME, TAGS } from "@utils/constants";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface Props {
  tags: [string, number][];
}

export default function Categories({ tags }: Props) {
  return (
    <>
      <Head>
        <title>Categories / {APP_NAME}</title>
      </Head>
      <PageTitle text="Categories" />
      <section>
        {tags.map(([tag, count]) => (
          <Link key={tag} href={`/category/${tag}`}>
            <a className="mr-5 bg-gray-300 rounded-full text-gray-600 dark:bg-gray-700 dark:text-gray-300 py-1 px-2 text-sm  hover:ring-2 ring-gray-400 hover:no-underline transition-all">
              {tag} ({count})
            </a>
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
