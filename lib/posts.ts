import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");
const postFiles = fs.readdirSync(postsDirectory).map((path) => path.replace(/\.mdx?$/i, ""));

export async function getPostBySlug(slug: string) {
  const filename = postFiles.find((path) => path.slice(11) === slug);
  const fullPath = join(postsDirectory, `${filename}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const source = await serialize(content);

  return {
    data,
    slug,
    source,
  };
}

export async function getPosts() {
  const posts = getPostSlugs().map(async (slug) => await getPostBySlug(slug));

  return Promise.all(posts);
}

export function getPostSlugs(): string[] {
  return postFiles.map((path) => {
    // Ensure files are in correct format.
    if (!/^\d{4}-\d{2}-\d{2}-[a-z]+$/.test(path)) {
      throw new Error(`Post file '${path}' has wrong filename format.`);
    }

    return path.slice(11);
  });
}
