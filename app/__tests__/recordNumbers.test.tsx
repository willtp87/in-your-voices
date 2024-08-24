import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import RecordNumbers from "../recordNumbers";

describe("<RecordNumbers />", () => {
  it("has number recorders", () => {
    render(
      <Provider store={store}>
        <RecordNumbers />
      </Provider>,
    );
    screen.getByTestId("mic0");
    screen.getByTestId("mic9");
  });
});
