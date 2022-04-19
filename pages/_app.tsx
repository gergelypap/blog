import Header from "@components/Header";
import "@styles/globals.css";
import { APP_NAME, APP_URL } from "@utils/constants";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Header />
          <main className="p-5">
            <DefaultSeo
              openGraph={{
                title: APP_NAME,
                description: "My website about coding, scripting and more.",
                type: "website",
                locale: "en_US",
                url: APP_URL,
                site_name: APP_NAME,
                images: [
                  {
                    url: `${APP_URL}/img/me.webp`,
                    width: 230,
                    height: 230,
                    alt: "Avatar",
                  },
                ],
              }}
              twitter={{
                handle: "@gergelypap",
                site: "@gergelypap",
                cardType: "summary",
              }}
            />
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
