import Header from "@components/Header";
import "@styles/globals.css";
import type { AppProps } from "next/app";
// TODO: Support dark and light mode, load only on blog post pages.
import "prism-themes/themes/prism-one-dark.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <Header></Header>
        <main className="p-5">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default App;
