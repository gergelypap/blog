import Config from "@utils/config";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload fonts and api fetch requests. */}
          <meta name="description" content={Config.appDescription} />
          <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/SFMono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/api/spotify" as="fetch" crossOrigin="anonymous" />
          <link rel="preload" href="/api/psn" as="fetch" crossOrigin="anonymous" />

          {/* Favicons and theming */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#111827" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111827" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
