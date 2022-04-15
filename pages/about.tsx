import PageTitle from "@components/PageTitle";
import { APP_NAME } from "@utils/constants";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About / {APP_NAME}</title>
      </Head>
      <PageTitle text="About" />
      <p>
        I am a full-stack web developer. This blog was made using the awesome{" "}
        <a href="https://nextjs.org" rel="noopener noreferrer">
          NextJS
        </a>{" "}
        framework, Tailwind and MDX as a learning project.
      </p>
    </>
  );
}
