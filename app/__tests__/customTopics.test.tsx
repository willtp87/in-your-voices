import { render, userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Topics from "../customTopics";

describe("<Topics />", () => {
  it("can add topics", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Topics />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
  }, 10000);
  it("can delete topics", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Topics />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
    await user.press(screen.getByTestId("delete0"));
    await user.press(screen.getByText("Confirm"));
    expect(await screen.queryByText("1")).toBeFalsy();
  });
  it("can edit topics", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Topics />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
    await user.press(screen.getByTestId("edit0"));
    await user.type(screen.getByTestId("title"), "testTitle");
    await user.type(screen.getByTestId("description"), "testdesc");
    await user.press(screen.getByText("Save"));
    expect(screen.queryByText("1")).toBeFalsy();
    expect(screen.getByText("testTitle"));
  });
  it("can navigate to a topic", async () => {
    const user = userEvent.setup();

    renderRouter({
      index: () => (
        <Provider store={store}>
          <Topics />
        </Provider>
      ),
    });

    await user.press(screen.getByRole("button", { name: "Add" }));
    await user.press(screen.getByTestId("enterTopic0"));
    expect(screen).toHavePathname("/customTopic");
  });
});
