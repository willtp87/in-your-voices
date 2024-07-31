import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Settings from "../config";

describe("<Settings />", () => {
  it("has dark mode", () => {
    render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    ).toJSON();
    expect(screen.queryByText("Dark mode:")).toBeTruthy();
  });
  it("has expected number of children", () => {
    const tree: any = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    ).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
