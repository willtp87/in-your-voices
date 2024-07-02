import { render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Index from "../index";

describe("<Index />", () => {
  it("Has expected number of children.", () => {
    const tree: any = render(
      <Provider store={store}>
        <Index />
      </Provider>,
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
