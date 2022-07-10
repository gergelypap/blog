import ContentTags from "@components/Content/ContentTags";
import Link from "@components/Link";
import { type Snippet } from "contentlayer/generated";

interface Props {
  content: Snippet;
}

export default function SnippetBox({ content }: Props) {
  return (
    <Link
      href={content.permalink}
      className="p-5 inline-block text-gray-900 border-gray-300 dark:border-gray-700 dark:text-gray-100 border-4 rounded-lg hover:no-underline hover:scale-105 hover:shadow-lg transition-all"
    >
      <article>
        <h2>{content.title}</h2>
        <ContentTags linked={false} tags={content.tags} className="mb-3" />
        <p className="m-0">{content.lead}</p>
      </article>
    </Link>
  );
}
