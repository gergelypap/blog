import { bundleMDX } from "mdx-bundler";
import { join } from "path";
import rehypeCodeTitles from "rehype-code-titles";
import { remarkMdxImages } from "remark-mdx-images";

const rootDir = process.cwd();

export async function parseMDX<Frontmatter>(source: string, dirname: string) {
  const { code, frontmatter: meta } = await bundleMDX<Frontmatter>({
    source,
    cwd: join(rootDir, "content", "posts", dirname),
    mdxOptions: (options) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeCodeTitles];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMdxImages];

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
