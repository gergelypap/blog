import Button from "@components/Button";
import DefaultLayout from "@components/Layout/DefaultLayout";
import PageTitle from "@components/PageTitle";
import Config from "@utils/config";
import Head from "next/head";

export default function About() {
  return (
    <DefaultLayout>
      <Head>
        <title>{`About | ${Config.appName}`}</title>
      </Head>
      <PageTitle>About</PageTitle>
      <p>
        I am a full-stack web developer. This blog was made using the awesome{" "}
        <a href="https://nextjs.org" rel="noopener noreferrer">
          NextJS
        </a>{" "}
        framework, Tailwind and MDX as a learning project.
      </p>
      <Button href="https://www.buymeacoffee.com/gpap1">☕ Buy me a coffee!</Button>
    </DefaultLayout>
  );
}
