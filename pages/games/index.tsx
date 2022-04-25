import DefaultLayout from "@components/Layout/DefaultLayout";
import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import { readdirSync } from "fs";
import type { GetStaticProps } from "next";
import { join } from "path";

interface Props {
  games: string[];
}

export default function GamesPage({ games }: Props) {
  return (
    <DefaultLayout>
      <PageTitle>Games</PageTitle>
      <p>Little, simple games I made in React. Have fun!</p>
      <section className="sm:grid sm:grid-cols-2 sm:gap-10">
        <ul>
          {games.map((game, i) => (
            <li key={i}>
              <Link href={`/games/${game}`}>{game}</Link>
            </li>
          ))}
        </ul>
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const gameComponents = readdirSync(join(process.cwd(), "components", "Games"));
  const games = gameComponents.map((game) => game.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase());

  return {
    props: {
      games,
    },
  };
};
