import "@styles/globals.css";
import Config from "@utils/config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

const SEO = {
  title: Config.appName,
  description: Config.appDescription,
  openGraph: {
    title: Config.appName,
    description: Config.appDescription,
    type: "website",
    locale: "en_US",
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

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
