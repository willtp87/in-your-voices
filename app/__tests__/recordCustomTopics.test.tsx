import {
  renderRouter,
  screen,
  userEvent,
  waitFor,
} from "expo-router/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { createTopic, getTopics } from "../../store/customTopics";
import RecordCustomTopics from "../recordCustomTopics";

describe("<RecordCustomTopics />", () => {
  it("can visit a topic", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    dispatch(createTopic());
    dispatch(getTopics());
    renderRouter({
      index: () => (
        <Provider store={store}>
          <RecordCustomTopics />
        </Provider>
      ),
    });
    await waitFor(() => {
      expect(screen.getByTestId("enterTopic0")).toBeInTheDocument();
    });
    user.press(screen.getByTestId("enterTopic0"));
    expect(screen).toHavePathname("/recordCustomTopic");
  });
});
