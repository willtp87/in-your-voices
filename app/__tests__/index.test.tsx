import { userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Index from "../index";

describe("<Index />", () => {
  it("can navigate to config", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Index />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("config"));
    expect(screen).toHavePathname("/config");
  });
  it("can navigate to numbers", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Index />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("numbers"));
    expect(screen).toHavePathname("/numbers/numbers");
  });
  it("can navigate to letters", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Index />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("letters"));
    expect(screen).toHavePathname("/letters/letters");
  });
  it("can navigate to colours", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Index />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("colours"));
    expect(screen).toHavePathname("/colours/colours");
  });
  it("can navigate to custom topics", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Index />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("custom"));
    expect(screen).toHavePathname("/custom/customTopics");
  });
});
