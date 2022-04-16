import Link from "@components/Link";
import { GITHUB_USERNAME } from "@utils/constants";
import { useRouter } from "next/router";

const links = [
  { title: "Blog", path: "/blog" },
  { title: "Tags", path: "/tags" },
  { title: "About", path: "/about" },
  { title: "Github", path: `https://github.com/${GITHUB_USERNAME}` },
];

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="mb-7">
      {links.map((link, i) => (
        <Link
          className={`mr-5 select-none ${
            router.pathname === link.path
              ? "text-gray-900 dark:text-gray-300  pointer-events-none font-semibold"
              : "text-blue-500"
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
