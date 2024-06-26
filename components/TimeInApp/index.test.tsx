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
    expect(screen.queryByText("0")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("1")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("2")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText("2")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText("3")).toBeTruthy();
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
