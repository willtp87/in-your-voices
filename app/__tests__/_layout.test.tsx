import { render } from "@testing-library/react-native";
import React from "react";

import App from "../_layout";

describe("<App />", () => {
  it("Has expected number of children.", () => {
    const tree: any = render(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
