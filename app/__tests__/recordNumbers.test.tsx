import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { createVoice } from "../../store/voices";
import { setManagingVoice } from "../../store/voicesSlice";
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
  it("uses current voice", () => {
    const dispatch = store.dispatch;
    const voice = { dir: "./voices/0", title: "title", desc: "desc" };
    dispatch(createVoice());
    act(() => {
      dispatch(setManagingVoice(voice));
    });
    render(
      <Provider store={store}>
        <RecordNumbers />
      </Provider>,
    );
    screen.getByText("desc");
  });
});
