import { render } from "@testing-library/react-native";
import React from "react";

import Circles from ".";

describe("<Circles />", () => {
  it("generates expected number of circles", () => {
    const tree: any = render(<Circles count={5} />).toJSON();
    expect(tree.children.length).toBe(5);
  });
});
