import { bundleMDX } from "mdx-bundler";
import { join } from "path";
import rehypeCodeTitles from "rehype-code-titles";

const rootDir = process.cwd();

export async function parseMDX<Frontmatter>(source: string, cwd: string) {
  const { code, frontmatter: meta } = await bundleMDX<Frontmatter>({
    source,
    cwd,
    mdxOptions: (options) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeCodeTitles];

      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
        ".webp": "file",
        ".gif": "file",
      };
      options.outdir = join(rootDir, ".next", "static", "media");
      options.publicPath = "/_next/static/media";
      options.write = true;

      return options;
    },
  });

  return {
    code,
    meta,
  };
}
