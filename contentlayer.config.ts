import type { ComputedFieldResolver } from "contentlayer/core";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { readFileSync } from "fs";
import { join } from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkMdxImages } from "remark-mdx-images";
import remarkUnwrapImages from "remark-unwrap-images";

const dateResolver: ComputedFieldResolver = (doc) => {
  const match = doc._raw.sourceFileDir.match(/\d{4}-\d{2}-\d{2}/);

  return match ? match[0] : null;
};

const slugResolver: ComputedFieldResolver = (doc) => {
  const dir = doc._raw.sourceFileDir.split("/").reverse()[0];
  const datePattern = /^\d{4}-\d{2}-\d{2}-/;

  // If it starts with date, remove it so the URL looks like `/blog/some-slug`.
  return datePattern.test(dir) ? dir.replace(datePattern, "") : dir;
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    lead: {
      type: "string",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: false,
    },
    published: {
      type: "boolean",
      required: true,
    },
    tags: {
      type: "list",
      required: true,
      of: {
        type: "string",
      },
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: slugResolver,
    },
    permalink: {
      type: "string",
      resolve: (doc) => "/blog/" + slugResolver(doc),
    },
    createdAt: {
      type: "date",
      resolve: dateResolver,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

export const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    lead: {
      type: "string",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: false,
    },
    tags: {
      type: "list",
      required: true,
      of: { type: "string" },
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: slugResolver,
    },
    permalink: {
      type: "string",
      resolve: (doc) => "/snippets/" + slugResolver(doc),
    },
    createdAt: {
      type: "date",
      resolve: dateResolver,
    },
  },
}));

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
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

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippet],
  mdx: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    remarkPlugins: [remarkUnwrapImages, remarkMdxImages, remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
    esbuildOptions: (options) => {
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
  },
});
