import { useEffect, useState } from "react";

type Game = null | {
  title: string;
  platform: string;
  playedAt: string;
  latestTrophy: {
    name: string;
    text: string;
    icon: string;
    type: string;
  };
};

export default function PlayStation() {
  const [game, setGame] = useState<Game>(null);

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch("/api/psn").then((data) => data.json());
      setGame(response);
    }

    fetchApi();
  }, []);

  return (
    <div className="text-sm flex cursor-default">
      <svg className="w-8 mr-3 flex-shrink-0" viewBox="0 0 1024 1024">
        <circle cx="512" cy="512" r="512" fill="#0070d1" />
        <path
          d="M242.37 595.7c-21.06 14-14 40.72 30.89 53.36a302.24 302.24 0 0 0 146 11.23c2.81 0 5.62-1.4 7-1.4v-47.75l-47.74 15.45c-18.25 5.62-36.51 7-54.76 2.81-14-4.21-11.23-12.64 5.62-19.66L426.32 576v-52l-134.8 46.34a181.6 181.6 0 0 0-49.15 25.36zm325.77-210.63v136.21c57.57 28.08 102.51 0 102.51-73 0-74.42-26.68-108.12-103.91-134.8-40.72-14-82.85-26.68-125-35.1v405.78l98.29 29.49V372.43c0-15.45 0-26.68 11.23-22.47 15.48 4.22 16.88 19.66 16.88 35.11zM750.69 563.4c-40.72-14-84.25-19.66-126.38-15.45-22.47 1.4-43.53 7-63.19 14l-4.21 1.4v54.76l91.27-33.7c18.25-5.62 36.51-7 54.76-2.81 14 4.21 11.23 12.64-5.62 19.66l-140.42 52v53.36L750.69 635c14-5.62 26.68-12.64 37.91-23.87 9.83-14.03 5.62-33.69-37.91-47.73z"
          fill="#fff"
        />
      </svg>

      {game ? (
        <div className="text-gray-800 dark:text-gray-300 flex flex-col justify-center truncate h-10">
          <span className="truncate">
            Played <span className="font-semibold">{game.title}</span> on {game.platform} {game.playedAt}
          </span>
          <span className="text-gray-500 dark:text-gray-400 truncate">
            Last trophy earned:
            <span className="ml-1 font-semibold" title={game.latestTrophy.type}>
              <TrophyIcon type={game.latestTrophy.type} /> {game.latestTrophy.name}
            </span>
          </span>
        </div>
      ) : (
        <div className="h-10 flex flex-col justify-center">Fetching...</div>
      )}
    </div>
  );
}

function TrophyIcon({ type }: { type: string | "bronze" | "silver" | "gold" | "platinum" }) {
  let color;
  switch (type) {
    case "bronze":
      color = "#cd7f32";
      break;
    case "silver":
      color = "#9e9e9e";
      break;
    case "gold":
      color = "#daa520";
      break;
    case "platinum":
      color = "#457ff7";
      break;
  }

  return (
    <svg className="inline mb-[3px]" height="12" viewBox="0 0 576 512">
      <path
        fill={color}
        d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64H447.9c.242-12.45.108-23.7-.156-33.02C447.3 13.63 433.2 0 415.8 0H160.2c-17.4 0-31.5 13.63-32 30.98-1.1 9.32-.4 20.57-.1 33.02H27.26c-11.1 0-20.723 7.59-23.348 18.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4 18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48 0 8.836 7.163 16 15.1 16h223.1c8.836 0 15.1-7.164 15.1-16 0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35 0-19.31 12.71-36.57 31.41-41.37 86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8c-27.94-41.2-30.4-84.1-29.03-107.8h80.39c5.359 59.62 20.35 131.1 57.67 189.1-49.04-19.5-85.54-46.7-109.03-81.3zm421.19 0c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39c.51 23.7-1.09 66.7-28.99 107.8z"
      />
    </svg>
  );
}
