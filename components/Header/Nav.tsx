import Link from "@components/Link";
import Config from "@utils/config";
import { useRouter } from "next/router";

const links = [
  { title: "Blog", path: "/blog" },
  { title: "Tags", path: "/tags" },
  { title: "About", path: "/about" },
  { title: "Github", path: `https://github.com/${Config.githubUsername}` },
];

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="mb-7">
      {links.map((link, i) => (
        <Link
          className={`mr-5 select-none font-semibold ${
            router.pathname === link.path || router.pathname.startsWith(link.path)
              ? "text-gray-900 dark:text-gray-300 hover:no-underline"
              : "text-blue-600 dark:text-blue-500"
          }`}
          key={i}
          href={link.path}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
