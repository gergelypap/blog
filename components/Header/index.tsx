import Config from "@utils/config";
import Image from "next/image";
import Link from "../Link";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="p-5 pb-10">
      <div className="float-right">
        <ThemeSwitch />
      </div>
      <Link className="hover:no-underline gap-3 inline-block mb-5" href="/">
        <div className="flex gap-3">
          <Image src="/logo.svg" height="40" width="40" alt="Logo" priority />
          <h1 className="mb-0 text-3xl inline-block text-gray-900 dark:text-gray-200">{Config.appName}</h1>
        </div>
      </Link>
      <Nav />
    </header>
  );
}
