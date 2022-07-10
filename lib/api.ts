/* eslint-disable security/detect-object-injection */
import { join } from "path";

const paths = {
  post: join(process.cwd(), "content", "posts"),
  snippet: join(process.cwd(), "content", "snippets"),
};

export type ContentType = keyof typeof paths;

type ReadFileResult = {
  fileContents: string;
  dirname: string;
};

// export async function readFileBySlug(slug: string, type: ContentType): Promise<ReadFileResult> {
//   const dirname = readdirSync(paths[type]).find((path) => path.slice(11) === slug);
//   if (!dirname) {
//     throw new Error(`File ${slug} not found!`);
//   }

//   const fileContents = readFileSync(join(paths[type], dirname, "index.mdx"), "utf8");

//   return { fileContents, dirname };
// }

// export async function getContentBySlug(slug: string, type: ContentType): Promise<MDXContent> {
//   const { fileContents, dirname } = await readFileBySlug(slug, type);
//   const cwd = join(paths[type], dirname);
//   const { code, meta } = await parseMDX(fileContents, cwd);

//   const content = {
//     code,
//     type,
//     meta: {
//       ...(meta as Metadata),
//       createdAt: dirname.slice(0, 10),
//     },
//   };

//   if (type === "post") {
//     return {
//       ...content,
//       permalink: `/blog/${slug}`,
//       readingTime: readingTime(fileContents),
//     } as Post;
//   }
//   if (type === "snippet") {
//     return {
//       ...content,
//       permalink: `/snippets/${slug}`,
//     } as SnippetContent;
//   }

//   return content;
// }

// export async function getAllContent(type: ContentType, limit = Infinity): Promise<MDXContent[]> {
//   const loadContent = getSlugs(type).map(async (slug) => await getContentBySlug(slug, type));
//   const content = await Promise.all(loadContent);

//   content.sort((a, b) => {
//     return +new Date(b.meta.createdAt) - +new Date(a.meta.createdAt);
//   });

//   return content.slice(0, limit);
// }

// export function getSlugs(type: ContentType): string[] {
//   return readdirSync(paths[type]).map((path) => {
//     // Ensure files are in correct format.
//     if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(path)) {
//       throw new Error(`Content file '${path}' has wrong filename format.`);
//     }

//     return path.slice(11);
//   });
// }

// export async function getContentByTag(tag: string) {
//   const posts = (await getAllContent("post")) as Post[];
//   const snippets = (await getAllContent("snippet")) as SnippetContent[];

//   return {
//     posts: posts.filter((post) => post.meta.tags.includes(tag)),
//     snippets: snippets.filter((snippet) => snippet.meta.tags.includes(tag)),
//   };
// }
