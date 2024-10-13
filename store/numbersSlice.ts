import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import { numbersDir } from "./voices";

// Tracks the number associated info.
// Typing for `state`.
interface numbersState {
  max: number;
  dir: string;
  recordingsType: string;
}
const initialState: numbersState = {
  max: 10,
  dir: numbersDir,
  recordingsType: "numberRecordings",
};

// Slice definition.
export const numbersSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {},
});

// Exports.
export const selectMax = (state: RootState) => state.numbers.max;
export const selectDir = (state: RootState) => state.numbers.dir;
export const selectRecordingsType = (state: RootState) =>
  state.numbers.recordingsType;
export default numbersSlice.reducer;
