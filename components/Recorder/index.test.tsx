import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import Recorder from ".";
import { store } from "../../store";
import { createVoice } from "../../store/voices";
import { setManagingVoice } from "../../store/voicesSlice";

describe("<Recorder />", () => {
  it("renders", () => {
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
        <Recorder
          recordings={[{ machineName: "x", label: "y", recording: "z" }]}
          recordingsType="x"
          recordingsDir="y"
        />
      </Provider>,
    );

    expect(screen.getByTestId("mic0"));
    expect(screen.getByText("desc"));
  });
});
