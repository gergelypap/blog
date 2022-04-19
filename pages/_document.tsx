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
          <meta name="description" content={Config.appDescription} />
          <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/SFMono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/api/spotify" as="fetch" crossOrigin="anonymous" />
          <link rel="preload" href="/api/psn" as="fetch" crossOrigin="anonymous" />
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
