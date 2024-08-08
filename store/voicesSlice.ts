import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import type { RootState } from ".";
import { forceCreateDir } from "../lib/files";

// Tracks voices.
// Typing for `state`.
interface voice {
  dir: string;
}
interface voicesState {
  voices: voice[];
  isLoading: boolean;
  error: string | null | undefined;
}

// Where all voices are.
const voicesDir = FileSystem.documentDirectory + "voices/";

// Get voices.
export const getVoices = createAsyncThunk("getVoices", async () => {
  await forceCreateDir(voicesDir);
  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  let voices: voice[] = [];
  if (voiceDirs) {
    voices = voiceDirs.map((voice) => {
      return { dir: voicesDir + voice };
    });
  }
  return voices;
});

// Create a voice.
export const createVoice = createAsyncThunk("createVoice", async () => {
  await forceCreateDir(voicesDir);
  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  const voiceDir = voicesDir + (voiceDirs ? voiceDirs.length : 0);
  await forceCreateDir(voiceDir);
  return { dir: voiceDir };
});

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
