import { Post, PostMetadata } from "@type/Post";
import { readdirSync, readFileSync } from "fs";
import { bundleMDX } from "mdx-bundler";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");
const postFiles = readdirSync(postsDirectory).map((path) => path.replace(/\.mdx?$/i, ""));

export async function getPostBySlug(slug: string): Promise<Post> {
  const filename = postFiles.find((path) => path.slice(11) === slug);
  if (!filename) {
    throw new Error(`File ${slug} not found!`);
  }
  const source = readFileSync(join(postsDirectory, `${filename}.mdx`), "utf8");
  const { code, frontmatter: meta } = await bundleMDX<PostMetadata>({ source });

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
