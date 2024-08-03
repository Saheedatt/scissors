module.exports = {
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
     "^.+\\.ts$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    // "^.+\\.(js|jsx)$": "babel-jest",
    // "^.+\\.ts$": "babel-jest",
    // "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
};
