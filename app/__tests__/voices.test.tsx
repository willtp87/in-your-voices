import { render, screen, userEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Voices from "../voices";

describe("<Voices />", () => {
  it("can add voices", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1", { exact: false }));
  });
  it("can delete voices", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1", { exact: false }));
    await user.press(screen.getByTestId("RNE__ICON__CONTAINER_ACTION"));
    expect(await screen.queryByText("1", { exact: false })).toBeFalsy();
  });
});
