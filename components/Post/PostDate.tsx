import { PostType } from "@type/Post";
import { prettyDate } from "utils/date";

interface Props {
  post: PostType;
  showUpdated?: boolean;
}

export default function PostDate({ post, showUpdated = false }: Props) {
  return (
    <span className="text-sm text-gray-400 inline-block mb-5">
      <time title={`Published at ${prettyDate(post.meta.createdAt)}`} dateTime={post.meta.createdAt}>
        {prettyDate(post.meta.createdAt)}
      </time>
      {showUpdated && post.meta.updatedAt && (
        <time className="italic ml-5" dateTime={post.meta.updatedAt}>
          Updated at {prettyDate(post.meta.updatedAt)}
        </time>
      )}
    </span>
  );
}
