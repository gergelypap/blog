const path = require("path");
const packageJson = require("./package.json");

const eslintCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ");
  return `${packageJson.scripts.lint} --fix --file ${files}`;
};

module.exports = {
  "*": ["prettier --ignore-unknown --write"],
  "*.{js,jsx,ts,tsx,md,mdx}": [eslintCommand],
};
