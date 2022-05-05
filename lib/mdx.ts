import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import remarkImages from "remark-images";

export async function parseMDX(fileContents: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(fileContents, {
    mdxOptions: {
      remarkPlugins: [remarkImages],
      rehypePlugins: [rehypeCodeTitles],
    },
    parseFrontmatter: true,
  });
}
