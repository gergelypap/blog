import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import { PostType } from "@type/Post";

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
      <Link className="text-inherit inline-block" href={post.permalink}>
        {title}
      </Link>
    );
  }

  return title;
}
