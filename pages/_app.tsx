import "@styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
