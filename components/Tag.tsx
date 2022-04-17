import Link from "./Link";

interface Props {
  name: string;
  className?: string;
}

export default function Tag(props: Props) {
  const { name } = props;

  return (
    <Link
      className={[
        `bg-gray-300 rounded-md text-xs font-semibold uppercase text-gray-600 dark:bg-gray-700 dark:text-gray-300 py-1 px-2 hover:ring-2 ring-gray-400 hover:no-underline transition-all`,
        props.className,
      ].join(" ")}
      href={`/tags/${name}`}
    >
      {name}
    </Link>
  );
}
