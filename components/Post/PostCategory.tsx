import Link from "next/link";

interface Props {
  tags: string[];
}

export default function PostCategory({ tags }: Props) {
  return (
    <span className="ml-5">
      Category:{" "}
      {tags.map((tag, i) => (
        <Link key={i} href={`/category/${tag}`}>
          <a>{tag}</a>
        </Link>
      ))}
    </span>
  );
}
