import { ReactNode } from "react";
import ContentTags from "./ContentTags";

interface Props {
  children?: ReactNode;
  tags: string[];
}

export default function ContentHeader({ children, tags }: Props) {
  return (
    <header className="text-gray-600 dark:text-gray-400 text-sm flex flex-col sm:flex-row gap-5">
      <div className="flex gap-5">{children}</div>
      {tags && <ContentTags tags={tags} />}
    </header>
  );
}
