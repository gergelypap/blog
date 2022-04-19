import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import Config from "@utils/config";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | {Config.appName}</title>
      </Head>
      <PageTitle>About</PageTitle>
      <p>
        I am a full-stack web developer. This blog was made using the awesome{" "}
        <a href="https://nextjs.org" rel="noopener noreferrer">
          NextJS
        </a>{" "}
        framework, Tailwind and MDX as a learning project.
      </p>
      <Link
        className="text-gray-100 bg-gradient-to-r from-green-500 to-blue-500 rounded-full py-2 px-5 inline-block hover:no-underline hover:opacity shadow-md hover:scale-105 transition-transform select-none"
        href="https://www.buymeacoffee.com/gpap1"
        role="button"
      >
        ☕ Buy me a coffee!
      </Link>
    </>
  );
}
