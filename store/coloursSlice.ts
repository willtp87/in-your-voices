import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import { coloursDir } from "./voices";

// Tracks the colours associated info.
// Typing for `state`.
interface coloursState {
  dir: string;
  recordingsType: string;
  colours: string[];
}
const initialState: coloursState = {
  dir: coloursDir,
  recordingsType: "colourRecordings",
  colours: [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "brown",
    "purple",
    "pink",
    "white",
    "black",
    "grey",
  ],
};

// Slice definition.
export const coloursSlice = createSlice({
  name: "colours",
  initialState,
  reducers: {},
});

// Exports.
export const selectColours = (state: RootState) => state.colours.colours;
export const selectDir = (state: RootState) => state.colours.dir;
export const selectRecordingsType = (state: RootState) =>
  state.colours.recordingsType;
export default coloursSlice.reducer;
