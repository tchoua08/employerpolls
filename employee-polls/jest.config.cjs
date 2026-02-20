module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  testMatch: ["<rootDir>/src/**/*.test.(js|jsx)"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};