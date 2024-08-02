import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import type { RootState } from ".";

// Tracks voices.
const voicesDir = FileSystem.documentDirectory + "voices/";
const ensureVoicesDir = async () => {
  const voicesDirInfo = await FileSystem.getInfoAsync(voicesDir);
  if (!voicesDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(voicesDir, { intermediates: true });
  }
};

// Get voices.
export const getVoices = createAsyncThunk("getVoices", async () => {
  await ensureVoicesDir();
  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  const voices = voiceDirs.map((voice) => {
    return { dir: voicesDir + voice };
  });
  return voices;
});

// Create a voice.
export const createVoice = createAsyncThunk("createVoice", async () => {
  await ensureVoicesDir();
  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  const voiceDir = voicesDir + voiceDirs.length;
  const voiceDirInfo = await FileSystem.getInfoAsync(voiceDir);
  if (!voiceDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(voiceDir, { intermediates: true });
  }
  return { dir: voiceDir };
});

// Typing for `state`.
interface voice {
  dir: string;
}
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
