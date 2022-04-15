import PageTitle from "@components/PageTitle";

export default function About() {
  return (
    <>
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
