import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>@gpap</h1>
      <p>My developer blog. Because everybody has one.</p>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </header>
  );
}
