import type { ReadTimeResults } from "reading-time";

export type MDXContent = {
  code: string;
  meta: Metadata;
};

export type Post = MDXContent & {
  permalink: string;
  readingTime: ReadTimeResults;
};

export type SnippetContent = MDXContent & {
  permalink: string;
};

export type Metadata = {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
};
