import Header from "@components/Header";
import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Header></Header>
          <main className="p-5">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
