import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import Voices from "../voices";

describe("<Settings />", () => {
  it("has add button", () => {
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    ).toJSON();
    expect(screen.queryByText("Add")).toBeTruthy();
  });
  it("voices can be added", () => {
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    ).toJSON();
    // todo: implement
  });
  it("voices can be edited", () => {
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    ).toJSON();
    // todo: implement
  });
  it("voices can be deleted", () => {
    render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    ).toJSON();
    // todo: implement
  });
  it("has expected number of children", () => {
    const tree: any = render(
      <Provider store={store}>
        <Voices />
      </Provider>,
    ).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
