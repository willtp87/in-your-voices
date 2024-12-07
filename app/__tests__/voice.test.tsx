import { userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Voice from "../voice";

describe("<Voice />", () => {
  it("can navigate to recordNumbers", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Voice />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("numbers"));
    expect(screen).toHavePathname("/recordNumbers");
  });
  it("can navigate to recordLetters", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Voice />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("letters"));
    expect(screen).toHavePathname("/recordLetters");
  });
  it("can navigate to custom topics", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Voice />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("custom"));
    expect(screen).toHavePathname("/recordCustomTopics");
  });
});
