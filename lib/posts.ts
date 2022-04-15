import { PostMetadata, PostType } from "@type/Post";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { parseMDX } from "./mdx";

const postsDirectory = join(process.cwd(), "posts");
const postFiles = readdirSync(postsDirectory)
  .filter((path) => path.includes(".mdx"))
  .map((path) => path.replace(/\.mdx?$/i, ""));

export async function getPostBySlug(slug: string): Promise<PostType> {
  const filename = postFiles.find((path) => path.slice(11) === slug);
  if (!filename) {
    throw new Error(`File ${slug} not found!`);
  }
  const fileContents = readFileSync(join(postsDirectory, `${filename}.mdx`), "utf8");
  const { code, meta } = await parseMDX<PostMetadata>(fileContents);

  // Extract the creation date from the filename.
  meta.createdAt = filename.slice(0, 10);

  return {
    code,
    meta,
    slug,
  };
}

export async function getPosts() {
  const posts = getPostSlugs().map(async (slug) => await getPostBySlug(slug));

  return Promise.all(posts);
}

export function getPostSlugs(): string[] {
  return postFiles.map((path) => {
    // Ensure files are in correct format.
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(path)) {
      throw new Error(`Post file '${path}' has wrong filename format.`);
    }

    return path.slice(11);
  });
}
