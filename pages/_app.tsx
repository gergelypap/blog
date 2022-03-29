import Header from "@components/Header";
import "@styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        <Header></Header>
        <main className="p-5">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default App;
