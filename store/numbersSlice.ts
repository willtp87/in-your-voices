import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Tracks the current number.
// Typing for `state`.
interface numbersState {
  value: number;
}
const initialState: numbersState = {
  value: 0,
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
export default numbersSlice.reducer;
