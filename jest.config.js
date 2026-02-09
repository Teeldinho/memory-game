const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^store/(.*)$": "<rootDir>/store/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
