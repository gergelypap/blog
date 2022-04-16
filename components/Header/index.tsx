import { APP_NAME } from "@utils/constants";
import Link from "../Link";
import Nav from "./Nav";
import Spotify from "./Spotify";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <h1 className="h-10 text-3xl font-bold">
        <Link className="inline-block text-inherit hover:no-underline" href="/">
          {APP_NAME}
        </Link>
      </h1>
      <Nav />
      <Spotify />
    </header>
  );
}
