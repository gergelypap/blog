import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { join } from "path";
import readingTime from "reading-time";

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
      resolve: (doc) => doc._raw.sourceFileDir.match(/\d{4}-\d{2}-\d{2}/)[0],
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
      resolve: (doc) => doc._raw.sourceFileDir.match(/\d{4}-\d{2}-\d{2}/)[0],
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippet],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
    cwd: join(process.cwd(), "content/snippets/2022-05-06-translucent-background"),
    esbuildOptions: (options) => {
      console.log(options);

      options.loader;
      options.target = "esnext";

      return options;
    },
  },
});
