// Make toBeInTheDocument() available globally.
import "@testing-library/jest-dom";

// Prevent timeouts in tests.
global.beforeEach(() => {
  // Set/clear Immediate not available by default. The use of fake and real timers here is intentional. Each prevents different issues.
  global.setImmediate = jest.useFakeTimers as unknown as typeof setImmediate;
  global.clearImmediate =
    jest.useRealTimers as unknown as typeof clearImmediate;

  jest.useFakeTimers();
});
global.afterEach(() => {
  jest.useRealTimers();
});

// https://github.com/expo/expo/issues/27496
jest.mock("expo-localization", () => ({
  getLocales: jest.fn(() => {
    return [{ languageCode: "en" }];
  }),
}));
