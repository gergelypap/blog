import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  exchangeRefreshTokenForAuthTokens,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
} from "psn-api";

const npsso = process.env.PSN_SSO_TOKEN;

async function authorize() {
  const accessCode = await exchangeNpssoForCode(npsso as string);
  let auth = await exchangeCodeForAccessToken(accessCode);

  const now = Date.now();
  const expirationDate = new Date(now + auth.expiresIn * 1000);
  const isAccessTokenExpired = expirationDate.getTime() < now;

  if (isAccessTokenExpired) {
    auth = await exchangeRefreshTokenForAuthTokens(auth.refreshToken);
  }

  return auth;
}

export default async function getLastPlayedGame() {
  const auth = await authorize();
  const userTitles = await getUserTitles({ accessToken: auth.accessToken }, "me");
  const lastPlayedTitle = userTitles.trophyTitles.find((title) => Object.values(title.earnedTrophies).some(Boolean));
  if (!lastPlayedTitle) {
    throw new Error("Could not fetch last played title.");
  }

  const { trophies: userTrophies } = await getUserTrophiesEarnedForTitle(
    { accessToken: auth.accessToken },
    "me",
    lastPlayedTitle.npCommunicationId,
    "all",
    { npServiceName: "trophy" }
  );

  const lastEarnedTrophy = userTrophies
    .filter((trophy) => trophy.earned)
    .sort((a, b) => +new Date(b.earnedDateTime as string) - +new Date(a.earnedDateTime as string))[0];

  const { trophies } = await getTitleTrophies(
    { accessToken: auth.accessToken },
    lastPlayedTitle.npCommunicationId,
    "all",
    { npServiceName: "trophy" }
  );

  const trophyDetails = trophies.find((trophy) => trophy.trophyId === lastEarnedTrophy.trophyId);

  if (!trophyDetails) {
    throw new Error("Could not fetch trophy details.");
  }

  return { lastPlayedTitle, lastEarnedTrophy, trophyDetails };
}
