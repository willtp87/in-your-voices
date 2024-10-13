import { Text } from "@rneui/themed";
import { render, screen, act, userEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import Player from ".";
import { store } from "../../store";
import { switchAutoPlay } from "../../store/settingsSlice";

describe("<Player />", () => {
  it("respects autoplay off", async () => {
    const user = userEvent.setup();
    const dispatch = store.dispatch;
    if (store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    render(
      <Provider store={store}>
        <Player
          playlist={[
            { machineName: "a", recording: "b", children: <Text>c</Text> },
            { machineName: "x", recording: "y", children: <Text>z</Text> },
          ]}
        />
      </Provider>,
    );
    screen.getByText("c");
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
    expect(screen.queryByText("z")).toBeFalsy();
  });
  it("respects autoplay", () => {
    const dispatch = store.dispatch;
    if (!store.getState().settings.autoPlay) dispatch(switchAutoPlay());
    render(
      <Provider store={store}>
        <Player
          playlist={[
            { machineName: "a", recording: "b", children: <Text>c</Text> },
            { machineName: "x", recording: "y", children: <Text>z</Text> },
          ]}
        />
      </Provider>,
    );
    expect(screen.getByText("c"));

    // Verify auto increment.
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("z"));

    // Verify next/prev are not present.
    expect(screen.queryByTestId("next")).toBeFalsy();
    expect(screen.queryByTestId("next")).toBeFalsy();
  });
});
