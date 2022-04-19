import PlayStation from "@components/Header/PlayStation";
import Spotify from "@components/Header/Spotify";
import Link from "@components/Link";
import React from "react";

function FooterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-base font-semibold mb-3">{title}</h6>
      {children}
    </div>
  );
}
function FooterLink({ href, text }: { href: string; text: string | React.ReactNode }) {
  return (
    <Link className="text-gray-500 dark:text-gray-500" href={href}>
      {text}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="min-h-[100px] text-sm border-t-2 dark:border-t-gray-800 mt-10 p-5">
      <Spotify />
      <PlayStation />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 mt-10 text-gray-500">
        <FooterBlock title="General">
          <FooterLink href="https://www.buymeacoffee.com/gpap1" text="Buy me a coffee!" />
          <FooterLink href="/about" text="About me" />
          <FooterLink href="/blog" text="Blog" />
          <FooterLink href="/tags" text="Tags" />
        </FooterBlock>
        <FooterBlock title="Social">
          <FooterLink href="https://github.com/gergelypap" text="Github" />
          <FooterLink href="https://twitter.com/gergelypap" text="Twitter" />
          <FooterLink href="https://www.linkedin.com/in/gpap/" text="LinkedIn" />
        </FooterBlock>
        <FooterBlock title="Coding">
          <FooterLink href="https://www.codewars.com/users/gpap" text="Codewars" />
          <FooterLink href="https://codepen.io/gpap" text="Codepen" />
        </FooterBlock>
        <FooterBlock title="Entertainment">
          <FooterLink href="https://open.spotify.com/user/irrt95n0lyd0a1i56rlmmpu8g" text="Spotify" />
          <FooterLink href="https://www.youtube.com/user/Gege42/" text="YouTube" />
        </FooterBlock>
      </div>
    </footer>
  );
}
