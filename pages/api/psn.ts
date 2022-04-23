import getLastPlayedGame from "@lib/psn";
import { formatDistanceToNow } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lastPlayedTitle, lastEarnedTrophy, trophyDetails } = await getLastPlayedGame();

  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");

  return res.status(200).json({
    title: lastPlayedTitle.trophyTitleName,
    platform: lastPlayedTitle.trophyTitlePlatform,
    syncedAt: formatDistanceToNow(new Date(lastPlayedTitle.lastUpdatedDateTime), { addSuffix: true }),
    latestTrophy: {
      name: trophyDetails.trophyName,
      text: trophyDetails.trophyDetail,
      icon: trophyDetails.trophyIconUrl,
      type: trophyDetails.trophyType,
      earnedAt: formatDistanceToNow(new Date(lastEarnedTrophy.earnedDateTime as string), { addSuffix: true }),
    },
  });
}
