import "@styles/globals.css";
import Config from "@utils/config";
import useAnalytics from "hooks/useAnalytics";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Script from "next/script";

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
  useAnalytics(Config.isProduction);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <DefaultSeo {...SEO} />
      {Config.isProduction && (
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
