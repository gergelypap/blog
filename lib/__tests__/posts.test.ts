import { getPostSlugs } from "@lib/posts";

it("validates post files", () => {
  const slugs = getPostSlugs();
  expect(slugs).toHaveLength(2);
});
