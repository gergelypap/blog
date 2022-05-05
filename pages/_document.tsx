import Config from "@utils/config";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang={Config.language}>
        <Head>
          {/* Preload fonts and api fetch requests. */}
          <meta name="description" content={Config.appDescription} />
          <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/api/spotify" as="fetch" crossOrigin="anonymous" />
          <link rel="preload" href="/api/psn" as="fetch" crossOrigin="anonymous" />

          {/* Favicons and theming */}
          <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png" />
          <link rel="manifest" href="/favicons/manifest.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="yandex-tableau-widget" href="/favicons/yandex-browser-manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="@gpap" />
          <meta name="msapplication-TileColor" content="#111827" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
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
