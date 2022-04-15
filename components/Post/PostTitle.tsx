import PageTitle from "@components/PageTitle";
import { Post } from "@type/Post";
import Link from "next/link";

interface Props {
  post: Post;
  clickable?: boolean;
}

export default function PostTitle({ post, clickable = false }: Props) {
  const title = <PageTitle text={post.meta.title} />;

  if (clickable) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <a className="text-inherit hover:no-underline">{title}</a>
      </Link>
    );
  }

  return title;
}
