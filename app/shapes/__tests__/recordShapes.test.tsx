import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import { createVoice } from "../../../store/voices";
import { setManagingVoice } from "../../../store/voicesSlice";
import RecordShapes from "../recordShapes";

describe("<RecordShapes />", () => {
  it("uses a voice", async () => {
    const dispatch = store.dispatch;
    const voice = {
      dir: "./voices/0",
      title: "title",
      desc: "desc",
    };
    dispatch(createVoice());
    act(() => {
      dispatch(setManagingVoice(voice));
    });
    render(
      <Provider store={store}>
        <RecordShapes />
      </Provider>,
    );
    expect(screen.getByTestId("mic0"));
    expect(screen.getByTestId("mic1"));
    expect(screen.getByText("Circle"));
    expect(screen.queryByTestId("stop0")).toBeFalsy();
    expect(screen.queryByTestId("play1")).toBeFalsy();
  });
});
