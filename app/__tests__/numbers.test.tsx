import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Numbers from "../numbers";

describe("<Numbers />", () => {
  it("generates a component", () => {
    const tree: any = render(
      <Provider store={store}>
        <Numbers />
      </Provider>,
    );
    expect(tree).toBeTruthy();
  });

  it("it increments over time", () => {
    render(
      <Provider store={store}>
        <Numbers />
      </Provider>,
    );

    expect(screen.queryByText("0")).toBeTruthy();
    // @todo: test that the number increments over time.
  });
});
