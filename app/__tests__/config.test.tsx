import { render, userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Config from "../config";

describe("<Config />", () => {
  it("has configs", () => {
    render(
      <Provider store={store}>
        <Config />
      </Provider>,
    );
    expect(screen.getByText("Dark mode:"));
    expect(screen.getByText("Autoplay:"));
    expect(screen.getByText("Documentation"));
  });
  it("can navigate to voices", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Config />
        </Provider>
      ),
    });

    await user.press(screen.getByTestId("voices"));
    expect(screen).toHavePathname("/voices");
  });
});
