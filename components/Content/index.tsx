import ContentDate from "@components/Content/ContentDate";
import ContentHeader from "@components/Content/ContentHeader";
import ContentTitleLink from "@components/Content/ContentTitleLink";
import ReadingTime from "@components/Content/ReadingTime";
import MDX from "@components/MDX";
import PageTitle from "@components/PageTitle";
import { Post, SnippetContent } from "@utils/types";
import Link from "next/link";

interface Props {
  content: Post | SnippetContent;
  full?: boolean;
}

const backLinks = {
  post: "/blog",
  snippet: "/snippets",
};

export default function Content({ content, full = false }: Props) {
  return (
    <article className="mb-10">
      {full ? (
        <PageTitle>{content.meta.title}</PageTitle>
      ) : (
        <ContentTitleLink permalink={content.permalink}>{content.meta.title}</ContentTitleLink>
      )}
      <ContentHeader tags={full && content.meta.tags}>
        <ContentDate content={content} />
        {content.type === "post" && <ReadingTime data={(content as Post).readingTime} />}
      </ContentHeader>
      <section className="my-5">{full ? <MDX code={content.code} /> : <p>{content.meta.lead}</p>}</section>
      <footer>
        {full ? <Link href={backLinks[content.type]}>← Back</Link> : <Link href={content.permalink}>Read more →</Link>}
      </footer>
    </article>
  );
}
