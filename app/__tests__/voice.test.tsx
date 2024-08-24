import { render, userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { store } from "../../store";
import Voice from "../voice";

describe("<Voice />", () => {
  it("has expected number of children", () => {
    const tree: any = render(
      <Provider store={store}>
        <Voice />
      </Provider>,
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
  it("can navigate to recordNumbers", async () => {
    const user = userEvent.setup();

    const mockVoice = () => (
      <Provider store={store}>
        <Voice />
      </Provider>
    );
    const mockView = () => <View />;

    renderRouter(
      {
        voice: mockVoice,
        recordNumbers: mockView,
      },
      {
        initialUrl: "/voice",
      },
    );

    expect(screen).toHavePathname("/voice");
    await user.press(screen.getByTestId("numbers"));
    expect(screen).toHavePathname("/recordNumbers");
  });
});
