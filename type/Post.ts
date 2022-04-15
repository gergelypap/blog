import type { ReadTimeResults } from "reading-time";

export type PostType = {
  code: string;
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
