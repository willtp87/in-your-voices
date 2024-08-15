import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import {
  voice,
  updateVoice,
  createVoice,
  deleteVoice,
  getVoices,
} from "./voices";

// Tracks voices.
interface voicesState {
  voices: voice[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: voicesState = {
  voices: [],
  isLoading: false,
  error: null,
};

// Slice definition.
export const voicesSlice = createSlice({
  name: "voices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update voice.
    builder.addCase(updateVoice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.voices = state.voices.filter(
        (voice) => voice.dir !== action.payload.dir,
      );
      state.voices.push(action.payload);
    });
    builder.addCase(updateVoice.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Delete voice.
    builder.addCase(deleteVoice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.voices = state.voices.filter(
        (voice) => voice.dir !== action.payload.dir,
      );
    });
    builder.addCase(deleteVoice.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Create voice.
    builder.addCase(createVoice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.voices.push(action.payload);
    });
    builder.addCase(createVoice.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Get voices.
    builder.addCase(getVoices.pending, (state) => {
      state.isLoading = true;
      state.voices = [];
    });
    builder.addCase(getVoices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.voices = action.payload;
    });
    builder.addCase(getVoices.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
      state.error = action.error.message;
      state.voices = [];
    });
  },
});

// Additional exports.
export const selectVoices = (state: RootState) => state.voices.voices;
export default voicesSlice.reducer;
