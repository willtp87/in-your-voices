import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { createTopic, getTopics } from "../../store/customTopics";
import { setManagingTopic } from "../../store/customTopicsSlice";
import { createVoice } from "../../store/voices";
import { setManagingVoice } from "../../store/voicesSlice";
import RecordCustomTopic from "../recordCustomTopic";

describe("<RecordCustomTopic />", () => {
  it("uses a voice and topic", async () => {
    const dispatch = store.dispatch;
    act(() => {
      dispatch(createTopic());
    });
    act(() => {
      dispatch(getTopics());
    });
    const voice = {
      dir: "./voices/0",
      title: "title",
      desc: "desc",
    };
    act(() => {
      dispatch(createVoice());
    });
    act(() => {
      dispatch(setManagingVoice(voice));
    });
    const topic = {
      dir: "./topics/0",
      title: "title",
      desc: "desc",
      recordingsType: "1",
      cards: [
        {
          image: "",
          title: "title0",
          desc: "desc0",
          machineName: "0",
        },
        {
          image: "",
          title: "title1",
          desc: "desc1",
          machineName: "1",
        },
      ],
      cardsOverTime: 2,
    };
    act(() => {
      dispatch(setManagingTopic(topic));
    });
    render(
      <Provider store={store}>
        <RecordCustomTopic />
      </Provider>,
    );
    expect(screen.getByTestId("mic0"));
    expect(screen.getByText("title0"));
    expect(screen.queryByTestId("stop0")).toBeFalsy();
    expect(screen.queryByTestId("play1")).toBeFalsy();
  });
});
