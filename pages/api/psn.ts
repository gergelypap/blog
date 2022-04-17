import getLastPlayedGame from "@lib/psn";
import { prettyDate } from "@utils/date";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lastPlayedGame = await getLastPlayedGame();
  lastPlayedGame.playedAt = prettyDate(lastPlayedGame.playedAt);

  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");

  return res.status(200).json(lastPlayedGame);
}
