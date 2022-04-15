import { bundleMDX } from "mdx-bundler";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";

export async function parseMDX<Frontmatter>(source: string) {
  const { code, frontmatter: meta } = await bundleMDX<Frontmatter>({
    source,
    // This is needed so mdx-bundler knows where to resolve from.
    cwd: process.cwd(),
    mdxOptions: (options) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeCodeTitles, rehypePrism];

      return options;
    },
  });

  return {
    code,
    meta,
  };
}
