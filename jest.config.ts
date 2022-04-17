import type { Config } from "@jest/types";
import nextJest from "next/jest";
import tsConfig from "./tsconfig.json";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Use tsconfig.json to set module name mapping.
const moduleNameMapper: { [key: string]: string } = {};
const paths: { [key: string]: string[] } = tsConfig.compilerOptions.paths;
Object.entries(paths).map((path) => {
  const key = path[0].replace(/^@([a-z]+)\/\*$/, "^@$1/(.*)$");
  const value = path[1][0].replace(/^([a-z]+)\/\*$/, "<rootDir>/$1/$$1");
  moduleNameMapper[key] = value;
});

// Add any custom config to be passed to Jest
const customJestConfig: Config.InitialOptions = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper,
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
