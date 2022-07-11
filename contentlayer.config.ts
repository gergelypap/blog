import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { join } from "path";
import readingTime from "reading-time";
import { remarkMdxImages } from "remark-mdx-images";
import remarkUnwrapImages from "remark-unwrap-images";

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
      resolve: (doc) => doc._raw.sourceFileDir.replace(/^[a-z]+\/\d{4}-\d{2}-\d{2}-/, ""),
    },
    permalink: {
      type: "string",
      resolve: (doc) => "/blog/" + doc._raw.sourceFileDir.replace(/^[a-z]+\/\d{4}-\d{2}-\d{2}-/, ""),
    },
    createdAt: {
      type: "date",
      resolve: (doc) => (doc._raw.sourceFileDir.match(/\d{4}-\d{2}-\d{2}/) as string[])[0],
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
      resolve: (doc) => doc._raw.sourceFileDir.replace(/^[a-z]+\/\d{4}-\d{2}-\d{2}-/, ""),
    },
    permalink: {
      type: "string",
      resolve: (doc) => "/snippets/" + doc._raw.sourceFileDir.replace(/^[a-z]+\/\d{4}-\d{2}-\d{2}-/, ""),
    },
    createdAt: {
      type: "date",
      resolve: (doc) => (doc._raw.sourceFileDir.match(/\d{4}-\d{2}-\d{2}/) as string[])[0],
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippet],
  mdx: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    remarkPlugins: [remarkUnwrapImages, remarkMdxImages],
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
        ".webp": "file",
        ".gif": "file",
      };
      options.outdir = join(process.cwd(), ".next", "static", "media");
      options.publicPath = "/_next/static/media";
      options.write = true;

      return options;
    },
  },
});
