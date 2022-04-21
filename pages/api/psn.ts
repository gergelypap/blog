import getLastPlayedGame from "@lib/psn";
import { formatDistanceToNow } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lastPlayedTitle, trophy } = await getLastPlayedGame();

  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");

  return res.status(200).json({
    title: lastPlayedTitle.trophyTitleName,
    platform: lastPlayedTitle.trophyTitlePlatform,
    playedAt: formatDistanceToNow(new Date(lastPlayedTitle.lastUpdatedDateTime), { addSuffix: true }),
    latestTrophy: {
      name: trophy.trophyName,
      text: trophy.trophyDetail,
      icon: trophy.trophyIconUrl,
      type: trophy.trophyType,
    },
  });
}
