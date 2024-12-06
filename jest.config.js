module.exports = {
  testEnvironment: "node",
  preset: "jest-expo/ios",
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui)",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  fakeTimers: { enableGlobally: true },
};
