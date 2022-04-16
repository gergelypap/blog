import NextLink from "next/link";
import React, { AriaRole } from "react";

interface Props {
  href: string;
  className?: string;
  children?: React.ReactNode;
  role?: AriaRole;
}

const Link: React.FC<Props> = (props) => {
  const { href, children } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternal) {
    return (
      <NextLink href={href}>
        <a {...props}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default Link;
