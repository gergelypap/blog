/* eslint-disable react/jsx-key */
import { useTheme } from "next-themes";
import Highlight, { defaultProps } from "prism-react-renderer";
import lightTheme from "prism-react-renderer/themes/github";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import React, { isValidElement, useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const CodeSnippet = ({ children }: Props) => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    setResolvedTheme(theme);
  }, [theme]);

  if (!children || !isValidElement(children)) {
    throw new Error(`Static code snippet cannot render children of type ${typeof children}`);
  }

  const code = children.props.children;
  const language = children.props.className?.replace("language-", "").trim();

  if (!code) {
    return <></>;
  }

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={resolvedTheme === "light" ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className}`} style={style}>
          {tokens.slice(0, -1).map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeSnippet;
