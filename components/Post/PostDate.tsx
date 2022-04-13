import { Post } from "@type/Post";
import { prettyDate } from "utils/date";

interface Props {
  post: Post;
}

export default function PostDate({ post }: Props) {
  return (
    <span className="text-sm text-gray-500 inline-block mb-5">
      <time title={`Published at ${prettyDate(post.meta.createdAt)}`} dateTime={post.meta.createdAt}>
        {prettyDate(post.meta.createdAt)}
      </time>
      {post.meta.updatedAt && (
        <time className="italic ml-5" dateTime={post.meta.updatedAt}>
          Updated at {prettyDate(post.meta.updatedAt)}
        </time>
      )}
    </span>
  );
}
