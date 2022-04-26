import * as gtag from "@lib/analytics";
import "@styles/globals.css";
import Config from "@utils/config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const SEO = {
  title: Config.appName,
  description: Config.appDescription,
  openGraph: {
    title: Config.appName,
    description: Config.appDescription,
    type: "website",
    locale: Config.language.replace("-", "_"),
    url: Config.appUrl,
    site_name: Config.appName,
    images: [
      {
        url: `${Config.appUrl}/logo.svg`,
        width: 230,
        height: 230,
        alt: "Avatar",
      },
    ],
  },
  twitter: {
    handle: "@gergelypap",
    cardType: "summary_large_image",
  },
};

const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, isProduction]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <DefaultSeo {...SEO} />
      {isProduction && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}', {
              page_path: window.location.pathname,
            });
          `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
