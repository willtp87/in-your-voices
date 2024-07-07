import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Main app settings.

// Typing for `state`.
interface settingsState {
  darkTheme: boolean;
}
const initialState: settingsState = {
  darkTheme: true,
};

// Slice definition.
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    switchDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

// Exports.
export const { switchDarkTheme } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
