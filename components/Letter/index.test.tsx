import { render, screen } from "@testing-library/react-native";
import React from "react";

import Letter from ".";

describe("<Letter />", () => {
  it("has expected text", () => {
    render(<Letter char="d" word="dee" />);
    expect(screen.getByText("d | D"));
    expect(screen.getByText("dee"));
  });
});
