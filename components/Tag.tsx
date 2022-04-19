import Link from "./Link";

interface Props {
  name: string;
  link?: boolean;
  className?: string | undefined;
}

export default function Tag({ name, link = true, className = undefined }: Props) {
  const classes = [
    `bg-gray-300 rounded-md text-xs font-semibold uppercase text-gray-600 dark:bg-gray-700 dark:text-gray-300 py-1 px-2 inline-block`,
    link && "hover:ring-2 ring-gray-400 hover:no-underline transition-all",
    className,
  ].join(" ");

  if (link) {
    return (
      <Link className={classes} href={`/tags/${name}`}>
        {name}
      </Link>
    );
  }

  return <span className={classes}>{name}</span>;
}
