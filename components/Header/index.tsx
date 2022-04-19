import PlayStation from "@components/Header/PlayStation";
import Config from "@utils/config";
import Image from "next/image";
import Link from "../Link";
import Nav from "./Nav";
import Spotify from "./Spotify";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5 pb-10">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <Link className="hover:no-underline gap-3 inline-block mb-5" href="/">
        <div className="flex gap-3">
          <Image
            className="mr-5 block rounded-full ring-gray-400"
            src="/img/me.webp"
            height="40"
            width="40"
            alt="Avatar"
            priority
          />
          <h1 className="mb-0 text-3xl inline-block text-gray-900 dark:text-gray-200">{Config.appName}</h1>
        </div>
      </Link>
      <Nav />
      <Spotify />
      <PlayStation />
    </header>
  );
}
