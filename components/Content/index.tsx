import ContentTitleLink from "@components/Content/ContentTitleLink";
import ReadingTime from "@components/Content/ReadingTime";
import Link from "@components/Link";
import MDX from "@components/MDX";
import PageTitle from "@components/PageTitle";
import { type Post } from "contentlayer/generated";
import ContentDate from "./ContentDate";
import ContentHeader from "./ContentHeader";

interface Props {
  content: Post;
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
        <PageTitle>{content.title}</PageTitle>
      ) : (
        <ContentTitleLink permalink={content.permalink}>{content.title}</ContentTitleLink>
      )}
      <ContentHeader tags={full && content.tags}>
        <ContentDate content={content} />
        {content.type === "Post" && <ReadingTime data={content.readingTime} />}
      </ContentHeader>
      <section className="my-5">{full ? <MDX code={content.body.code} /> : <p>{content.lead}</p>}</section>
      <footer>
        {full ? <Link href={backLinks[content.type]}>← Back</Link> : <Link href={content.permalink}>Read more →</Link>}
      </footer>
    </article>
  );
}
