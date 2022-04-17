import getLastPlayedGame from "@lib/psn";
import { formatDistance } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lastPlayedGame = await getLastPlayedGame();
  lastPlayedGame.playedAt = formatDistance(new Date(lastPlayedGame.playedAt), new Date(), { addSuffix: true });

  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");

  return res.status(200).json(lastPlayedGame);
}
