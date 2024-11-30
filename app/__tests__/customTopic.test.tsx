import { render, userEvent, act, within } from "@testing-library/react-native";
import { screen } from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { createTopic } from "../../store/customTopics";
import { setManagingTopic } from "../../store/customTopicsSlice";
import CustomTopic from "../customTopic";

describe("<CustomTopic />", () => {
  it("can add a card", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    const topic = {
      dir: "./topics/0",
      title: "title",
      desc: "desc",
      cards: [],
      cardsOverTime: 0,
    };
    dispatch(createTopic());
    act(() => {
      dispatch(setManagingTopic(topic));
    });
    render(
      <Provider store={store}>
        <CustomTopic />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
  }, 10000);
  it("can delete a card", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    const topic = {
      dir: "./topics/0",
      title: "title",
      desc: "desc",
      cards: [],
      cardsOverTime: 0,
    };
    dispatch(createTopic());
    act(() => {
      dispatch(setManagingTopic(topic));
    });
    render(
      <Provider store={store}>
        <CustomTopic />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("1"));
    await user.press(screen.getByTestId("delete0"));
    await user.press(screen.getByText("Confirm"));
    expect(await screen.queryByText("1")).toBeFalsy();
  });
  it("can edit a card", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    const topic = {
      dir: "./topics/0",
      title: "title",
      desc: "desc",
      cards: [],
      cardsOverTime: 0,
    };
    dispatch(createTopic());
    act(() => {
      dispatch(setManagingTopic(topic));
    });
    render(
      <Provider store={store}>
        <CustomTopic />
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
  it("can re-order a card", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    const topic = {
      dir: "./topics/0",
      title: "title",
      desc: "desc",
      cards: [],
      cardsOverTime: 0,
    };
    dispatch(createTopic());
    act(() => {
      dispatch(setManagingTopic(topic));
    });
    render(
      <Provider store={store}>
        <CustomTopic />
      </Provider>,
    );
    expect(await screen.findByText("Add"));
    await user.press(screen.getByRole("button", { name: "Add" }));
    await user.press(screen.getByRole("button", { name: "Add" }));
    await user.press(screen.getByRole("button", { name: "Add" }));
    let cards = screen.getAllByTestId("cardTitle", {
      exact: false,
    });
    expect(cards.length).toBe(3);
    expect(within(cards[0]).getByText("1")).toBeTruthy();
    expect(within(cards[1]).getByText("2")).toBeTruthy();
    expect(within(cards[2]).getByText("3")).toBeTruthy();
    await user.press(screen.getByTestId("up0"));
    await user.press(screen.getByTestId("down2"));
    cards = screen.getAllByTestId("cardTitle", {
      exact: false,
    });
    expect(within(cards[0]).getByText("1")).toBeTruthy();
    expect(within(cards[1]).getByText("2")).toBeTruthy();
    expect(within(cards[2]).getByText("3")).toBeTruthy();
    await user.press(screen.getByTestId("up1"));
    cards = screen.getAllByTestId("cardTitle", {
      exact: false,
    });
    expect(within(cards[0]).getByText("2")).toBeTruthy();
    expect(within(cards[1]).getByText("1")).toBeTruthy();
    expect(within(cards[2]).getByText("3")).toBeTruthy();
    await user.press(screen.getByTestId("down0"));
    cards = screen.getAllByTestId("cardTitle", {
      exact: false,
    });
    expect(within(cards[0]).getByText("1")).toBeTruthy();
    expect(within(cards[1]).getByText("2")).toBeTruthy();
    expect(within(cards[2]).getByText("3")).toBeTruthy();
  });
});
