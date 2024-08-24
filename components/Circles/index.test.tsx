import { render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import Circles from ".";
import { store } from "../../store";

describe("<Circles />", () => {
  it("generates expected number of circles", () => {
    const tree: any = render(
      <Provider store={store}>
        <Circles count={5} />
      </Provider>,
    ).toJSON();
    expect(tree.children.length).toBe(5);
  });
});
