import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Main app settings.

// Typing for `state`.
interface settingsState {
  darkTheme: boolean;
  autoPlay: boolean;
}
const initialState: settingsState = {
  darkTheme: true,
  autoPlay: true,
};

// Slice definition.
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    switchDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    switchAutoPlay: (state) => {
      state.autoPlay = !state.autoPlay;
    },
  },
});

// Exports.
export const { switchDarkTheme, switchAutoPlay } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
