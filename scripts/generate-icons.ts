import favicons, { FaviconResponse } from "favicons";
import fs from "fs";
import path from "path";
import packageJson from "../package.json";
import Config from "../utils/config";

const source = path.resolve(process.cwd(), "public/logo.svg");
const shouldWrite = false;

const callback = function (error: Error, response: FaviconResponse) {
  if (shouldWrite) {
    const publicDir = path.resolve(process.cwd(), "public");
    for (const image of response.images) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.createWriteStream(`${publicDir}/${image.name}`).write(image.contents);
    }
    for (const file of response.files) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(`${publicDir}/${file.name}`, file.contents);
    }
  }

  console.log("Copy and paste these into the <head> element:\n");
  console.log(response.html.join("\n"));
};

const options = {
  path: "/",
  appName: Config.appName,
  appShortName: Config.appName,
  appDescription: Config.appDescription,
  developerURL: Config.appUrl,
  lang: Config.language,
  background: Config.backgroundColor,
  theme_color: Config.themeColor,
  appleStatusBarStyle: "black-translucent",
  display: "minimal-ui",
  orientation: "any",
  scope: "/",
  start_url: "/?homescreen=1",
  version: packageJson.version,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: true,
    yandex: true,
  },
};

favicons(source, options, callback);
