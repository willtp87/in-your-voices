import { render } from "@testing-library/react-native";
import React from "react";
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
});