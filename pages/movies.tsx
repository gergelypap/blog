import DefaultLayout from "@components/Layout/DefaultLayout";
import Link from "@components/Link";
import PageTitle from "@components/PageTitle";
import Config from "@utils/config";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

interface Props {
  movies: {
    url: string;
    title: string;
    year: number;
    runtime: string;
    genre: string;
    plot: string;
    rating: number;
    poster: string;
  }[];
}

export default function About({ movies }: Props) {
  return (
    <DefaultLayout>
      <Head>
        <title>Movies | {Config.appName}</title>
      </Head>
      <PageTitle>Movies</PageTitle>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>Some movies I've recently watched. Data is scraped from my IMDb page.</p>
      {movies.map((movie, i) => (
        <div key={i} className="clear-left mb-5 inline-block">
          <div className="float-left mr-5">
            <Image src={movie.poster} width="140" height="209" alt={movie.title} />
          </div>
          <div>
            <h2 className="mb-3">
              <Link className="dark:text-gray-100 text-gray-800" href={movie.url}>
                {movie.title} <span className="font-normal">({movie.year})</span>
              </Link>
            </h2>
            <div className="text-sm mb-3 text-gray-500 dark:text-gray-400">
              {movie.genre} | {movie.runtime} | <span className="font-bold">⭐ {movie.rating}</span>
            </div>
            <p>{movie.plot}</p>
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(process.env.APP_URL + "/api/imdb");
  const movies = await response.json();

  return {
    props: {
      movies,
    },
    revalidate: 10,
  };
};
