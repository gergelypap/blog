import type { ReadTimeResults } from "reading-time";

export type Post = {
  code: string;
  meta: PostMetadata;
  permalink: string;
  thumbnail: PostThumbnail;
  readingTime: ReadTimeResults;
};

export type PostThumbnail = {
  src: string;
  width?: number;
  height?: number;
};

export type PostMetadata = {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
};
