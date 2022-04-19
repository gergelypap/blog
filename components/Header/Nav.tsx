import Link from "@components/Link";
import { useRouter } from "next/router";

const links = [
  { title: "Blog", path: "/blog" },
  { title: "Tags", path: "/tags" },
];

export default function Nav() {
  const router = useRouter();

  return (
    <nav>
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
