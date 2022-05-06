import Tag from "@components/Tag";

interface Props {
  tags: string[];
}

export default function ContentTags({ tags }: Props) {
  return (
    <span className="flex flex-wrap gap-3">
      {tags.map((tag, i) => (
        <Tag key={i} name={tag} />
      ))}
    </span>
  );
}
