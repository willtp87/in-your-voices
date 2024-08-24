import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Settings from "../config";

describe("<Config />", () => {
  it("has dark mode", () => {
    render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    expect(screen.getByText("Dark mode:"));
  });
});
