import Link from "@components/Link";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  permalink: string;
}

export default function ContentTitleLink({ children, permalink }: Props) {
  return (
    <Link href={permalink}>
      <h1 className="text-2xl text-gray-900 dark:text-gray-200 inline-block hover:underline font-bold">{children}</h1>
    </Link>
  );
}
