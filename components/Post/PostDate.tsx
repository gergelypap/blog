import { PostType } from "@type/Post";
import { prettyDate } from "utils/date";

interface Props {
  post: PostType;
}

export default function PostDate({ post }: Props) {
  let hoverText = `Published at ${prettyDate(post.meta.createdAt)}`;
  if (post.meta.updatedAt) hoverText += ` and updated at ${prettyDate(post.meta.updatedAt)}`;

  return (
    <time title={hoverText} dateTime={post.meta.createdAt}>
      {prettyDate(post.meta.createdAt)}
      {post.meta.updatedAt && "*"}
    </time>
  );
}
