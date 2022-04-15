import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

interface Props {
  code: string;
}

export default function MDXComponent({ code }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component />;
}
