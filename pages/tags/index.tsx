import PageTitle from "@components/PageTitle";
import Tag from "@components/Tag";
import { APP_NAME, TAGS } from "@utils/constants";
import { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  tags: string[];
}

export default function TagsListingPage({ tags }: Props) {
  return (
    <>
      <Head>
        <title>Tags / {APP_NAME}</title>
      </Head>
      <PageTitle>Tags</PageTitle>
      <p>Find all content filtered by tags.</p>
      <section className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <Tag key={i} name={tag} />
        ))}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tags: TAGS,
    },
  };
};
