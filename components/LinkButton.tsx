import Link from "next/link";

interface Props {
  href: string;
  text: string;
}

export default function LinkButton(props: Props) {
  const { href, text } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
  const classes =
    "text-gray-100 bg-gradient-to-r from-green-500 to-blue-500 rounded-full py-2 px-5 inline-block hover:no-underline hover:opacity shadow-md hover:scale-105 transition-transform select-none";

  if (isInternal) {
    return (
      <Link href={href}>
        <a role="button" className={classes} {...props}>
          {text}
        </a>
      </Link>
    );
  }

  return (
    <a className={classes} href={href} target="_blank" rel="noopener noreferrer" role="button">
      {text}
    </a>
  );
}
