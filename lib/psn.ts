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
  const authorization = await exchangeCodeForAccessToken(accessCode);

  // Get the user's games.
  const userTitles = await getUserTitles({ accessToken: authorization.accessToken }, "me");

  // Find the first game which has any earned trophies.
  const lastPlayedTitle = userTitles.trophyTitles.find(
    (title) => Object.values(title.earnedTrophies).filter(Boolean).length > 0
  );

  if (!lastPlayedTitle) {
    return undefined;
  }

  // Get the user's trophies for the latest played game.
  const { trophies: userTrophies } = await getUserTrophiesEarnedForTitle(
    { accessToken: authorization.accessToken },
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
    { accessToken: authorization.accessToken },
    lastPlayedTitle.npCommunicationId,
    "all",
    { npServiceName: "trophy" }
  );

  // Finally get the trophy's details, like name and icon.
  const trophyDetails = trophies.find((trophy) => trophy.trophyId == lastEarnedTrophy.trophyId);

  if (!trophyDetails) {
    return undefined;
  }

  return {
    title: lastPlayedTitle.trophyTitleName,
    platform: lastPlayedTitle.trophyTitlePlatform,
    playedAt: lastPlayedTitle.lastUpdatedDateTime,
    latestTrophy: {
      name: trophyDetails.trophyName,
      text: trophyDetails.trophyDetail,
      icon: trophyDetails.trophyIconUrl,
      type: trophyDetails.trophyType,
    },
  };
}
