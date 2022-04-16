import { getNowPlaying } from "@lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((a: { name: string }) => a.name).join(", ");
  const url = song.item.external_urls.spotify;

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");

  return res.status(200).json({
    isPlaying,
    title,
    artist,
    url,
  });
}
