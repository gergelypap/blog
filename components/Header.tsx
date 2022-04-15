import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <h1 className="h-10 text-3xl font-bold">
        <Link href="/">
          <a className="inline-block text-inherit hover:no-underline">@gpap</a>
        </Link>
      </h1>
      <p className="my-5 text-gray-400">My developer blog. Because everybody has one.</p>
      <nav>
        <Link href="/blog">
          <a className="mr-5 inline-block">Blog</a>
        </Link>
        <Link href="/about">
          <a className="mr-5 inline-block">About</a>
        </Link>
      </nav>
    </header>
  );
}
