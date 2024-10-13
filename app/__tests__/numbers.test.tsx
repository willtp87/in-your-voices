import { render, screen, userEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { switchAutoPlay } from "../../store/settingsSlice";
import Numbers from "../numbers";

describe("<Numbers />", () => {
  it("respects autoplay off", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    if (store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    render(
      <Provider store={store}>
        <Numbers />
      </Provider>,
    );
    expect(screen.getByText("0"));

    // Go to next and verify increment.
    await user.press(screen.getByTestId("next"));
    expect(screen.getByText("1"));
  });
});
