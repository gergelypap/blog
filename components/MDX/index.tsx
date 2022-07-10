import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
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
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={components} />;
}
