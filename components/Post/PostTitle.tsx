import PageTitle from "@components/PageTitle";
import { PostType } from "@type/Post";
import Link from "next/link";

interface Props {
  post: PostType;
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
