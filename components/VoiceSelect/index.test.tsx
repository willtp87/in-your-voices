import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import VoiceSelect from ".";
import { store } from "../../store";

describe("<VoiceSelect />", () => {
  // Picker doesn't render during tests.
  it("renders", async () => {
    render(
      <Provider store={store}>
        <VoiceSelect />
      </Provider>,
    );
    expect(await screen.findByText("Voice:"));
  });
});
