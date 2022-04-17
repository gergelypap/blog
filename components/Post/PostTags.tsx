import Link from "@components/Link";

interface Props {
  tags: string[];
}

export default function PostTags({ tags }: Props) {
  return (
    <span>
      {tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </span>
  );
}
