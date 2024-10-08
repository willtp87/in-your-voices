import { render, screen, act, userEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { reset } from "../../store/numbersSlice";
import { switchAutoPlay } from "../../store/settingsSlice";
import Numbers from "../numbers";

describe("<Numbers />", () => {
  it("respects autoplay off", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    if (store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    dispatch(reset());
    render(
      <Provider store={store}>
        <Numbers />
      </Provider>,
    );
    expect(screen.getByText("0"));

    // Verify next/prev are present.
    expect(screen.getByTestId("next"));
    expect(screen.queryByTestId("prev")).toBeFalsy();

    // Go to next and verify previous exists.
    await user.press(screen.getByTestId("next"));
    expect(screen.getByTestId("prev"));

    // Verify we do not auto increment.
    await user.press(screen.getByTestId("prev"));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.queryByText("1")).toBeFalsy();
  });
  it("autoplay is respected", () => {
    const dispatch = store.dispatch;
    if (!store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    dispatch(reset());
    render(
      <Provider store={store}>
        <Numbers />
      </Provider>,
    );
    expect(screen.getByText("0"));

    // Verify auto increment.
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("1"));

    // Verify next/prev are not present.
    expect(screen.queryByTestId("next")).toBeFalsy();
    expect(screen.queryByTestId("next")).toBeFalsy();
  });
});
