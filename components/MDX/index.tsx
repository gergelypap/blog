import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import CodeSnippet from "./CodeSnippet";

interface Props {
  code: string;
}

const components = {
  pre: CodeSnippet,
};

export default function MDX({ code }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component components={components} />;
}
