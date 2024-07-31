import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Tracks voices.

// Typing for `state`.
interface voicesState {
  voices: object[];
}
const initialState: voicesState = {
  voices: [],
};

// Slice definition.
export const voicesSlice = createSlice({
  name: "voices",
  initialState,
  reducers: {
    createVoice: (state) => {
      // todo: implement
      console.log("createVoice");
    },
  },
});

// Exports.
export const { createVoice } = voicesSlice.actions;
export const selectVoices = (state: RootState) => state.voices.voices;
export default voicesSlice.reducer;
