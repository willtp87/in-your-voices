import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import Number from ".";
import { store } from "../../store";
describe("<Number />", () => {
  it("has expected text", () => {
    render(
      <Provider store={store}>
        <Number num={0} word="Zero" />
      </Provider>,
    );
    expect(screen.getByText("0"));
    expect(screen.getByText("Zero"));
  });
});
