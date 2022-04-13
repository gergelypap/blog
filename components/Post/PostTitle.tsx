import { Post } from "@type/Post";
import Link from "next/link";

interface Props {
  post: Post;
  clickable?: boolean;
}

export default function PostTitle({ post, clickable = false }: Props) {
  const title = <h1 className="text-2xl font-bold mb-2">{post.meta.title}</h1>;

  if (clickable) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <a className="text-inherit hover:no-underline">{title}</a>
      </Link>
    );
  }

  return title;
}
