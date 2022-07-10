import Config from "@utils/config";
import { type Post, type Snippet } from "contentlayer/generated";
import { ArticleJsonLd, NextSeo } from "next-seo";

interface Props {
  content: Post | Snippet;
}

export default function SEO({ content }: Props) {
  return (
    <>
      <NextSeo
        title={content.title}
        titleTemplate={`%s | ${Config.appName}`}
        description={content.lead}
        canonical={`${Config.appUrl}${content.permalink}`}
        openGraph={{
          site_name: Config.appName,
          url: `${Config.appUrl}${content.permalink}`,
          title: content.title,
          description: content.lead,
          images: [
            {
              url: `${Config.appUrl}/img/default-thumbnail.jpg`,
              width: 1145,
              height: 599,
              alt: content.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={`${Config.appUrl}${content.permalink}`}
        title={content.title}
        images={[`${Config.appUrl}/img/default-thumbnail.jpg`]}
        datePublished={content.createdAt}
        dateModified={content.updatedAt || undefined}
        authorName="Gergely Pap"
        description={content.lead}
      />
    </>
  );
}
