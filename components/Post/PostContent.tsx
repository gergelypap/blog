import { Post } from "@type/Post";
import { MDXRemote } from "next-mdx-remote";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

function CodeBlock({ className, ...props }: { className: string }) {
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div" style={atomOneDark} {...props} />
  ) : (
    <code className={className} {...props} />
  );
}

const components = {
  code: CodeBlock,
};

export default function PostContent({ post }: { post: Post }) {
  // TODO: Fix types.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <MDXRemote {...post.source} components={components} />;
}
