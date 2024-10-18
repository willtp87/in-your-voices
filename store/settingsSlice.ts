import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Main app settings.

// Typing for `state`.
interface settingsState {
  darkTheme: boolean;
  autoPlay: boolean;
  shuffle: boolean;
}
const initialState: settingsState = {
  darkTheme: true,
  autoPlay: true,
  shuffle: false,
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
    switchShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
  },
});

// Exports.
export const { switchDarkTheme, switchAutoPlay, switchShuffle } =
  settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
