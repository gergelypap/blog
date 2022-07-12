import type { ComputedFieldResolver } from "contentlayer/core";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import mdxOptions from "./lib/mdx";

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

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippet],
  mdx: mdxOptions,
});
