import PageTitle from "@components/PageTitle";
import { PostType } from "@type/Post";
import Link from "next/link";

interface Props {
  post: PostType;
  clickable?: boolean;
}

export default function PostTitle({ post, clickable = false }: Props) {
  const title = clickable ? (
    <h1 className="text-xl font-bold mb-2.5">{post.meta.title}</h1>
  ) : (
    <PageTitle text={post.meta.title} />
  );

  if (clickable) {
    return (
      <Link href={post.permalink}>
        <a className="text-inherit inline-block">{title}</a>
      </Link>
    );
  }

  return title;
}
