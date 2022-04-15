import type { ReadTimeResults } from "reading-time";

export interface PostType {
  code: string;
  meta: PostMetadata;
  slug: string;
  readingTime: ReadTimeResults;
}

export interface PostMetadata {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
}
