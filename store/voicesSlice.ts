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
  managingVoice: voice | null;
  activeVoice: voice | null;
  error: string | null | undefined;
}

const initialState: voicesState = {
  voices: [],
  error: null,
  managingVoice: null,
  activeVoice: null,
};

// Slice definition.
export const voicesSlice = createSlice({
  name: "voices",
  initialState,
  reducers: {
    setManagingVoice: (state, action) => {
      state.managingVoice = action.payload;
    },
    setActiveVoice: (state, action) => {
      state.activeVoice = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Update voice.
    builder.addCase(updateVoice.fulfilled, (state, action) => {
      // Update voice in voice list.
      state.voices = state.voices.filter(
        (voice) => voice.dir !== action.payload.dir,
      );
      state.voices.push(action.payload);
      // Update managing/active voice if they have been edited.
      if (state.managingVoice?.dir === action.payload.dir) {
        state.managingVoice = action.payload;
      }
      if (state.activeVoice?.dir === action.payload.dir) {
        state.activeVoice = action.payload;
      }
    });
    builder.addCase(updateVoice.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Delete voice.
    builder.addCase(deleteVoice.fulfilled, (state, action) => {
      state.voices = state.voices.filter(
        (voice) => voice.dir !== action.payload.dir,
      );
      // Unset active voice if it is deleted.
      if (state.activeVoice?.dir === action.payload.dir) {
        state.activeVoice = null;
      }
    });
    builder.addCase(deleteVoice.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Create voice.
    builder.addCase(createVoice.fulfilled, (state, action) => {
      state.voices.push(action.payload);
    });
    builder.addCase(createVoice.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
    });
    // Get voices.
    builder.addCase(getVoices.fulfilled, (state, action) => {
      state.voices = action.payload;
    });
    builder.addCase(getVoices.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message;
      state.voices = [];
    });
  },
});

// Additional exports.
export const { setManagingVoice, setActiveVoice } = voicesSlice.actions;
export const selectVoices = (state: RootState) => state.voices.voices;
export const selectManagingVoice = (state: RootState) =>
  state.voices.managingVoice;
export const selectActiveVoice = (state: RootState) => state.voices.activeVoice;
export default voicesSlice.reducer;
