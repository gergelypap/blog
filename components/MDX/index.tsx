import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { useMemo } from "react";
import CodeSnippet from "./CodeSnippet";
import YouTube from "./YouTube";

interface Props {
  code: string;
}

const components = {
  pre: CodeSnippet,
  Image,
  YouTube,
};

export default function MDX({ code }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component components={components} />;
}
