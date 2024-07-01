import { render, screen, act } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import TimeInApp from ".";
import { store } from "../../store";

describe("<TimeInApp />", () => {
  it("increments the timer each second", () => {
    render(
      <Provider store={store}>
        <TimeInApp />
      </Provider>,
    );
    expect(screen.getByText("0", { exact: false })).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("1", { exact: false })).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("2", { exact: false })).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText("2", { exact: false })).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText("3", { exact: false })).toBeTruthy();
  });

  it("clears the interval when the component is unmounted", () => {
    const clearIntervalMock = jest.spyOn(window, "clearInterval");
    const { unmount } = render(
      <Provider store={store}>
        <TimeInApp />
      </Provider>,
    );

    unmount();
    expect(clearIntervalMock).toHaveBeenCalled();
  });
});
