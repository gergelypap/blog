import { prettyDate } from "@utils/date";
import type { Post, Snippet } from "contentlayer/generated";

interface Props {
  content: Post | Snippet;
}

export default function ContentDate({ content }: Props) {
  let hoverText = `Published at ${prettyDate(content.createdAt)}`;
  if (content.updatedAt) hoverText += ` and updated at ${prettyDate(content.updatedAt)}`;

  return (
    <time title={hoverText} dateTime={content.createdAt}>
      {prettyDate(content.createdAt)}
      {content.updatedAt && "*"}
    </time>
  );
}
