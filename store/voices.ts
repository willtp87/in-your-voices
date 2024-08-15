import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import { forceCreateDir } from "../lib/files";

// Voice CRUD.
// Filename for voice data.
const voiceJSON = "/voice.json";

// Typing for `state`.
export interface voice {
  dir: string;
  title: string | null;
  desc: string | null;
}
// Where all voices are.
const voicesDir = FileSystem.documentDirectory + "voices/";

// Get voices.
export const getVoices = createAsyncThunk("getVoices", async () => {
  await forceCreateDir(voicesDir);
  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  let voices: voice[] = [];
  if (voiceDirs) {
    voices = await Promise.all(
      voiceDirs.map(async (voiceDir) => {
        let voiceVals: voice = {
          dir: voicesDir + voiceDir,
          title: null,
          desc: null,
        };
        try {
          voiceVals = JSON.parse(
            await FileSystem.readAsStringAsync(
              voicesDir + voiceDir + voiceJSON,
            ),
          );
        } catch {}
        return {
          dir: voiceVals.dir,
          title: voiceVals.title ?? null,
          desc: voiceVals.desc ?? null,
        };
      }),
    );
  }
  return voices;
});

// Create a voice.
export const createVoice = createAsyncThunk("createVoice", async () => {
  await forceCreateDir(voicesDir);

  const voiceDirs = await FileSystem.readDirectoryAsync(voicesDir);
  const voiceDir =
    voicesDir +
    (voiceDirs
      ? voiceDirs.reduce((acc: number, value: string) => {
          return (acc =
            acc > parseInt(value, 10) ? acc : parseInt(value, 10) + 1);
        }, 1)
      : 1);

  await forceCreateDir(voiceDir);
  await forceCreateDir(voiceDir + "/Numbers");

  return { dir: voiceDir, title: null, desc: null };
});

// Delete a voice.
export const deleteVoice = createAsyncThunk(
  "deleteVoice",
  async (dir: string) => {
    await FileSystem.deleteAsync(dir, { idempotent: true });
    return { dir };
  },
);

// Update a voice.
export const updateVoice = createAsyncThunk(
  "updateVoice",
  async (voiceIn: voice) => {
    await FileSystem.writeAsStringAsync(
      voiceIn.dir + voiceJSON,
      JSON.stringify(voiceIn),
    );
    return voiceIn;
  },
);
