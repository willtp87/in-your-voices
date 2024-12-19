import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import { shapesDir } from "./voices";

// Tracks the shapes associated info.
// Typing for `state`.
interface shapesState {
  dir: string;
  recordingsType: string;
  shapes: string[];
}
const initialState: shapesState = {
  dir: shapesDir,
  recordingsType: "shapeRecordings",
  shapes: [
    "circle",
    "triangle",
    "square",
    "rectangle",
    "oval",
    "heart",
    "star",
  ],
};

// Slice definition.
export const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {},
});

// Exports.
export const selectShapes = (state: RootState) => state.shapes.shapes;
export const selectDir = (state: RootState) => state.shapes.dir;
export const selectRecordingsType = (state: RootState) =>
  state.shapes.recordingsType;
export default shapesSlice.reducer;
