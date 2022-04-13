import { MDXRemoteProps } from "next-mdx-remote";

export interface Post {
  meta: PostMetadata;
  slug: string;
  source: MDXRemoteProps;
}

export interface PostMetadata {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
}