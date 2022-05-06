import Tag from "@components/Tag";

interface Props {
  tags: string[];
  linked?: boolean;
  className?: string;
}

export default function ContentTags({ tags, linked = true, className }: Props) {
  return (
    <span className={["flex flex-wrap gap-3", className].join(" ")}>
      {tags.map((tag, i) => (
        <Tag key={i} name={tag} link={linked} />
      ))}
    </span>
  );
}
