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
  return postFiles.map((path) => path.slice(11));
}
