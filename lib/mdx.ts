import type { MDXOptions } from "contentlayer/core";
import { readFileSync } from "fs";
import type { ESBuildOptions } from "mdx-bundler/dist/types";
import { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePresetMinify from "rehype-preset-minify";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkMdxImages } from "remark-mdx-images";
import remarkUnwrapImages from "remark-unwrap-images";

const rehypePrettyCodeOptions: Partial<RehypePrettyCodeOptions> = {
  theme: {
    // TODO: Why require or import does not work?
    dark: JSON.parse(readFileSync("node_modules/shiki/themes/material-palenight.json").toString()),
    light: JSON.parse(readFileSync("node_modules/shiki/themes/github-light.json").toString()),
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkUnwrapImages, remarkMdxImages, remarkGfm],
  rehypePlugins: [
    [rehypePrettyCode, rehypePrettyCodeOptions],
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypePresetMinify,
  ],
  esbuildOptions: (options: ESBuildOptions) => {
    options.loader = {
      ...options.loader,
      ".png": "file",
      ".jpg": "file",
      ".jpeg": "file",
      ".webp": "file",
      ".gif": "file",
    };
    options.outdir = join(process.cwd(), "public/img/generated");
    options.publicPath = "/img/generated";
    options.write = true;

    return options;
  },
};

export default mdxOptions;
