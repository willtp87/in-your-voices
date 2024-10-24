import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import { lettersDir } from "./voices";

// Tracks the letters associated info.
// Typing for `state`.
interface lettersState {
  dir: string;
  recordingsType: string;
  letters: string[];
}
const initialState: lettersState = {
  dir: lettersDir,
  recordingsType: "letterRecordings",
  letters: [..."abcdefghijklmnopqrstuvwxyz"],
};

// Slice definition.
export const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
});

// Exports.
export const selectLetters = (state: RootState) => state.letters.letters;
export const selectDir = (state: RootState) => state.letters.dir;
export const selectRecordingsType = (state: RootState) =>
  state.letters.recordingsType;
export default lettersSlice.reducer;
