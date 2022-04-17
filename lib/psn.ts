import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
} from "psn-api";

const npsso = process.env.PSN_AUTH_TOKEN;

export default async function getLastPlayedGame() {
  const accessCode = await exchangeNpssoForCode(npsso as string);
  const auth = await exchangeCodeForAccessToken(accessCode);

  // Get the user's games.
  const userTitles = await getUserTitles({ accessToken: auth.accessToken }, "me");

  // Find the first game which has any earned trophies.
  const lastPlayedTitle = userTitles.trophyTitles.find(
    (title) => Object.values(title.earnedTrophies).filter(Boolean).length > 0
  );

  if (!lastPlayedTitle) {
    throw new Error("Could not fetch last played title.");
  }

  // Get the user's trophies for the latest played game.
  const { trophies: userTrophies } = await getUserTrophiesEarnedForTitle(
    { accessToken: auth.accessToken },
    "me",
    lastPlayedTitle.npCommunicationId,
    "all",
    { npServiceName: "trophy" }
  );

  // Find the last earned trophy from the user's game trophies.
  const lastEarnedTrophy = userTrophies
    .filter((trophy) => trophy.earned)
    .sort((a, b) => +new Date(a.earnedDateTime as string) - +new Date(b.earnedDateTime as string))[0];

  // Get the trophy information for the game, because it contains details about the trophy.
  const { trophies } = await getTitleTrophies(
    { accessToken: auth.accessToken },
    lastPlayedTitle.npCommunicationId,
    "all",
    { npServiceName: "trophy" }
  );

  // Finally get the trophy's details, like name and icon.
  const trophy = trophies.find((trophy) => trophy.trophyId == lastEarnedTrophy.trophyId);

  if (!trophy) {
    throw new Error("Could not fetch trophy details.");
  }

  return { lastPlayedTitle, trophy };
}
