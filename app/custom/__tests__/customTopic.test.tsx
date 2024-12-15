import { render, screen, userEvent, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import { createTopic, getTopics } from "../../../store/customTopics";
import { setActiveTopic } from "../../../store/customTopicsSlice";
import { switchAutoPlay } from "../../../store/settingsSlice";
import PlayCustomTopic from "../customTopic";

describe("<PlayCustomTopic />", () => {
  it("uses first increment", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    if (store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    act(() => {
      dispatch(createTopic());
    });
    act(() => {
      dispatch(getTopics());
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
      dispatch(setActiveTopic(topic));
    });
    render(
      <Provider store={store}>
        <PlayCustomTopic />
      </Provider>,
    );
    expect(screen.getByText("title0"));

    // Go to next and verify increment.
    await user.press(screen.getByTestId("next"));
    expect(screen.getByText("title1"));
  });
});
