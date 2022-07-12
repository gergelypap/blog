const Config = {
  appName: "@gpap",
  appUrl: process.env.APP_URL,
  appDescription: "My website about coding, scripting and more.",
  githubUsername: "gergelypap",
  tags: ["js", "meta", "gaming", "css"],
  backgroundColor: "#111827",
  themeColor: "#f9fafb",
  language: "en-US",
  isProduction: process.env.NODE_ENV === "production",
};

export default Config;
