import { prettyDate } from "@utils/date";
import type { Post, SnippetContent } from "@utils/types";

interface Props {
  content: Post | SnippetContent;
}

export default function ContentDate({ content }: Props) {
  let hoverText = `Published at ${prettyDate(content.meta.createdAt)}`;
  if (content.meta.updatedAt) hoverText += ` and updated at ${prettyDate(content.meta.updatedAt)}`;

  return (
    <time title={hoverText} dateTime={content.meta.createdAt}>
      {prettyDate(content.meta.createdAt)}
      {content.meta.updatedAt && "*"}
    </time>
  );
}
