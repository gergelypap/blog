import { APP_NAME, GITHUB_USERNAME } from "@utils/constants";
import Link from "next/link";
import Spotify from "./Spotify";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <h1 className="h-10 text-3xl font-bold">
        <Link href="/">
          <a className="inline-block text-inherit hover:no-underline">{APP_NAME}</a>
        </Link>
      </h1>
      <p className="my-5 text-gray-500">My developer blog. Because everybody has one.</p>
      <nav className="font-semibold mb-7">
        <Link href="/blog">
          <a className="mr-5 inline-block">Blog</a>
        </Link>
        <Link href="/tags">
          <a className="mr-5 inline-block">Tags</a>
        </Link>
        <Link href="/about">
          <a className="mr-5 inline-block">About</a>
        </Link>
        <a href={`https://github.com/${GITHUB_USERNAME}`} rel="noopener noreferrer" target="_blank">
          Github
        </a>
      </nav>
      <Spotify />
    </header>
  );
}
