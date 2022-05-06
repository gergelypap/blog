import Config from "@utils/config";
import { Post, SnippetContent } from "@utils/types";
import { ArticleJsonLd, NextSeo } from "next-seo";

interface Props {
  content: Post | SnippetContent;
}

export default function SEO({ content }: Props) {
  return (
    <>
      <NextSeo
        title={content.meta.title}
        titleTemplate={`%s | ${Config.appName}`}
        description={content.meta.lead}
        canonical={`${Config.appUrl}${content.permalink}`}
        openGraph={{
          site_name: Config.appName,
          url: `${Config.appUrl}${content.permalink}`,
          title: content.meta.title,
          description: content.meta.lead,
          images: [
            {
              url: `${Config.appUrl}/img/default-thumbnail.jpg`,
              width: 1145,
              height: 599,
              alt: content.meta.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={`${Config.appUrl}${content.permalink}`}
        title={content.meta.title}
        images={[`${Config.appUrl}/img/default-thumbnail.jpg`]}
        datePublished={content.meta.createdAt}
        dateModified={content.meta.updatedAt || undefined}
        authorName="Gergely Pap"
        description={content.meta.lead}
      />
    </>
  );
}
