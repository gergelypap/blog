import { bundleMDX } from "mdx-bundler";
import rehypeCodeTitles from "rehype-code-titles";

export async function parseMDX<Frontmatter>(source: string) {
  const { code, frontmatter: meta } = await bundleMDX<Frontmatter>({
    source,
    // This is needed so mdx-bundler knows where to resolve from.
    cwd: process.cwd(),
    mdxOptions: (options) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeCodeTitles];

      return options;
    },
  });

  return {
    code,
    meta,
  };
}
