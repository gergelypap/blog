import Link from "./Link";

interface Props {
  href?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button(props: Props) {
  const classes =
    "text-gray-100 dark:text-gray-100 bg-gradient-to-r from-green-500 to-blue-500 rounded-full py-2 px-5 inline-block hover:no-underline hover:opacity shadow-md hover:scale-105 transition-transform select-none";
  if (props.href) {
    return (
      <Link className={[classes, props.className].join(" ")} href={props.href} role="button" {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <button {...props} className={[classes, props.className].join(" ")}>
      {props.children}
    </button>
  );
}
