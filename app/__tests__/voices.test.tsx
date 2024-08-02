import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Voices from "../voices";

describe("<Voices />", () => {
  it("has add button", async () => {
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
  });
});
