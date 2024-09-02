import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import { numbersDir } from "./voices";

// Tracks the number associated info.

// Typing for `state`.
interface numbersState {
  value: number;
  max: number;
  dir: string;
}
const initialState: numbersState = {
  value: 0,
  max: 10,
  dir: numbersDir,
};

// Slice definition.
export const numbersSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

// Exports.
export const { increment, decrement, reset } = numbersSlice.actions;
export const selectCount = (state: RootState) => state.numbers.value;
export const selectMax = (state: RootState) => state.numbers.max;
export const selectDir = (state: RootState) => state.numbers.dir;
export default numbersSlice.reducer;
