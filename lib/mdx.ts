import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";

export async function parseMDX(fileContents: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(fileContents, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles],
    },
    parseFrontmatter: true,
  });
}
