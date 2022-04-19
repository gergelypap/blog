import Header from "@components/Header";
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
        url: `${Config.appUrl}/img/me.webp`,
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
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Header />
          <main className="p-5">
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
