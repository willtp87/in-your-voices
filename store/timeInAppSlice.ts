import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from ".";

// Typing for `state`.
interface timeInAppState {
  value: number;
}
const initialState: timeInAppState = {
  value: 0,
};

// Slice definition.
export const timeInAppSlice = createSlice({
  name: "timeInApp",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Exports.
export const { increment, decrement, incrementByAmount } =
  timeInAppSlice.actions;
export const selectCount = (state: RootState) => state.timeInApp.value;
export default timeInAppSlice.reducer;
