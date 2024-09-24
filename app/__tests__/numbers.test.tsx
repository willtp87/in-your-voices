import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../store";
import { reset } from "../../store/numbersSlice";
import { switchAutoPlay } from "../../store/settingsSlice";
import Numbers from "../numbers";

describe("<Numbers />", () => {
  it("respects autoplay off", () => {
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
    // @todo go to next and verify previous exists.

    // Verify we do not auto increment.
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
