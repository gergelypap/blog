import Link from "next/link";

interface Props {
  tags: string[];
}

export default function PostTags({ tags }: Props) {
  return (
    <span className="ml-5">
      Tags:{" "}
      {tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
          <a>{tag}</a>
        </Link>
      ))}
    </span>
  );
}
