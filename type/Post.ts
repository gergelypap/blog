export interface Post {
  code: string;
  meta: PostMetadata;
  slug: string;
}

export interface PostMetadata {
  title: string;
  lead: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
}
