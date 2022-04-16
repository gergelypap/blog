import { APP_NAME, GITHUB_USERNAME } from "@utils/constants";
import Link from "./Link";
import Spotify from "./Spotify";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <h1 className="h-10 text-3xl font-bold">
        <Link className="inline-block text-inherit hover:no-underline" href="/blog">
          {APP_NAME}
        </Link>
      </h1>
      <p className="my-5 text-gray-500">My developer blog. Because everybody has one.</p>
      <nav className="font-semibold mb-5">
        <Link className="mr-5" href="/blog">
          Blog
        </Link>
        <Link className="mr-5" href="/tags">
          Tags
        </Link>
        <Link className="mr-5" href="/about">
          About
        </Link>
        <Link className="mr-5" href={`https://github.com/${GITHUB_USERNAME}`}>
          Github
        </Link>
      </nav>
      <Spotify />
    </header>
  );
}
