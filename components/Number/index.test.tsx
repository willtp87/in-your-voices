import { render, screen } from "@testing-library/react-native";
import React from "react";

import Number from ".";

describe("<Number />", () => {
  it("has expected text", () => {
    render(<Number num={0} word="Zero" />);
    expect(screen.getByText("0"));
    expect(screen.getByText("Zero"));
  });
});
