import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export const postFiles = fs.readdirSync(postsDirectory).map((path) => path.replace(/\.mdx?$/i, ""));

export async function getPostBySlug(slug: string) {
  const fullPath = join(postsDirectory, `${slug}.mdx`);
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
  const posts = postFiles.map(async (slug) => await getPostBySlug(slug));

  return Promise.all(posts);
}
