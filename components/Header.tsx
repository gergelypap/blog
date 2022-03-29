import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold">
        <Link href="/">
          <a className="py-5 inline-block text-inherit hover:no-underline">@gpap</a>
        </Link>
      </h1>
      <p className="mb-3 text-gray-500 text-center">My developer blog. Because everybody has one.</p>
      <nav className="">
        <Link href="/blog">
          <a className="p-2 mx-2 inline-block">Blog</a>
        </Link>
        <Link href="/about">
          <a className="p-2 mx-2 inline-block">About</a>
        </Link>
      </nav>
    </header>
  );
}
