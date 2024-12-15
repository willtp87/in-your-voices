import { render, screen, userEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import { switchAutoPlay } from "../../../store/settingsSlice";
import Colours from "../colours";

describe("<Colours />", () => {
  it("uses first increment", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    if (store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    render(
      <Provider store={store}>
        <Colours />
      </Provider>,
    );
    expect(screen.getByText("Red"));

    // Go to next and verify increment.
    await user.press(screen.getByTestId("next"));
    expect(screen.getByText("Green"));
  });
});
