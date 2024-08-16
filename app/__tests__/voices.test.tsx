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
    expect(await screen.findByText("1"));
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
    expect(await screen.findByText("1"));
    await user.press(screen.getByTestId("delete0"));
    await user.press(screen.getByText("Confirm"));
    expect(await screen.queryByText("1")).toBeFalsy();
  });
  it("can edit voices", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
    await user.press(screen.getByTestId("edit0"));
    await user.type(screen.getByTestId("title"), "testTitle");
    await user.type(screen.getByTestId("description"), "testdesc");
    await user.press(screen.getByText("Save"));
    expect(await screen.queryByText("1")).toBeFalsy();
    expect(await screen.getByText("testTitle"));
  });
  it("has voice config entry", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
    expect(screen.getByTestId("enterVoice0"));
  });
});
