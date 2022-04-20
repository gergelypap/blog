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
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="yandex-tableau-widget" href="/yandex-browser-manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="@gpap" />
          <meta name="msapplication-TileColor" content="#111827" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111827" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="@gpap" />
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
