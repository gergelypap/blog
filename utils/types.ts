import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ReadTimeResults } from "reading-time";

export type Post = {
  source: MDXRemoteSerializeResult;
  meta: PostMetadata;
  permalink: string;
  readingTime: ReadTimeResults;
};

export type PostMetadata = {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
};
