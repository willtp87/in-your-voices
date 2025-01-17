import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import { createVoice } from "../../../store/voices";
import { setManagingVoice } from "../../../store/voicesSlice";
import RecordNumbers from "../recordNumbers";

describe("<RecordNumbers />", () => {
  it("uses a voice", async () => {
    /**
     * @xxx Running into testing problems with recordings.
     * Failed to start recording TypeError: Cannot read properties of undefined (reading 'uri')
     *  at Recording.uri (/home/wpanting/rn-dev/in-your-voices/node_modules/expo-av/src/Audio/Recording.ts:327:9)
     *  at Generator.next (<anonymous>)
     *  at asyncGeneratorStep (/home/wpanting/rn-dev/in-your-voices/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:17)
     *  at _next (/home/wpanting/rn-dev/in-your-voices/node_modules/@babel/runtime/helpers/asyncToGenerator.js:17:9)
     */
    const dispatch = store.dispatch;
    const voice = {
      dir: "./voices/0",
      title: "title",
      desc: "desc",
      numberRecordings: [{ machineName: "0", label: "tst", recording: "tst" }],
      letterRecordings: [{ machineName: "a", label: "A", recording: "tst" }],
    };
    dispatch(createVoice());
    act(() => {
      dispatch(setManagingVoice(voice));
    });
    render(
      <Provider store={store}>
        <RecordNumbers />
      </Provider>,
    );
    expect(screen.getByTestId("mic0"));
    expect(screen.getByTestId("mic10"));
    expect(screen.getByTestId("play0"));
    expect(screen.getByText("desc"));
    expect(screen.getByText("5"));
    expect(screen.queryByTestId("stop0")).toBeFalsy();
    expect(screen.queryByTestId("play1")).toBeFalsy();
  });
});
