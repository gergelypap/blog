import Link from "@components/Link";

interface Props {
  tags: string[];
}

export default function PostTags({ tags }: Props) {
  return (
    <span className="ml-5">
      Tags:{" "}
      {tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </span>
  );
}
