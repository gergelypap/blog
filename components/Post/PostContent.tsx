import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

export default function PostContent({ mdxCode }: { mdxCode: string }) {
  const MDXComponent = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);

  return <MDXComponent />;
}
