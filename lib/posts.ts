import type { Post, PostMetadata, PostThumbnail } from "@utils/types";
import { existsSync, readdirSync, readFileSync } from "fs";
import imageSize from "image-size";
import { join } from "path";
import readingTime from "reading-time";
import { parseMDX } from "./mdx";

const rootDir = process.cwd();
const postsDirectory = join(rootDir, "posts");
const postDirs = readdirSync(postsDirectory);

async function getThumbnail(dirname: string): Promise<PostThumbnail> {
  const thumbnailExists = existsSync(join(postsDirectory, dirname, "thumbnail.jpg"));
  let src, width, height;
  if (thumbnailExists) {
    ({ default: src } = await import(`posts/${dirname}/thumbnail.jpg`));
    ({ width, height } = imageSize(`posts/${dirname}/thumbnail.jpg`));
  } else {
    src = "/img/default-thumbnail.jpg";
    ({ width, height } = imageSize(join(rootDir, "public", src)));
  }

  return { src, width, height };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const dirname = postDirs.find((path) => path.slice(11) === slug);
  if (!dirname) {
    throw new Error(`File ${slug} not found!`);
  }
  const fileContents = readFileSync(join(postsDirectory, dirname, "index.mdx"), "utf8");
  const { code, meta } = await parseMDX<PostMetadata>(fileContents, dirname);

  // Extract the creation date from the dirname.
  meta.createdAt = dirname.slice(0, 10);
  const thumbnail = await getThumbnail(dirname);

  return {
    code,
    meta,
    thumbnail,
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
