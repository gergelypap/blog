import type { Post, PostMetadata } from "@utils/types";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import readingTime from "reading-time";
import { parseMDX } from "./mdx";

const postsDirectory = join(process.cwd(), "posts");
const postDirs = readdirSync(postsDirectory);

export async function getPostBySlug(slug: string): Promise<Post> {
  const dirname = postDirs.find((path) => path.slice(11) === slug);
  if (!dirname) {
    throw new Error(`File ${slug} not found!`);
  }
  const fileContents = readFileSync(join(postsDirectory, dirname, "index.mdx"), "utf8");
  const { code, meta } = await parseMDX<PostMetadata>(fileContents);

  // Extract the creation date from the dirname.
  meta.createdAt = dirname.slice(0, 10);

  return {
    code,
    meta,
    permalink: `/blog/${slug}`,
    readingTime: readingTime(fileContents),
  };
}

export async function getPosts(limit = Infinity): Promise<Post[]> {
  const loadPosts = getPostSlugs().map(async (slug) => await getPostBySlug(slug));
  const posts = await Promise.all(loadPosts);

  posts.sort((a, b) => {
    return +new Date(b.meta.createdAt) - +new Date(a.meta.createdAt);
  });

  return posts.slice(0, limit);
}

export function getPostSlugs(): string[] {
  return postDirs.map((path) => {
    // Ensure files are in correct format.
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(path)) {
      throw new Error(`Post file '${path}' has wrong filename format.`);
    }

    return path.slice(11);
  });
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPosts();

  return posts.filter((post) => post.meta.tags.includes(tag));
}
