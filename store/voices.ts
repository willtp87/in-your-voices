import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import { forceCreateDir } from "../lib/files";

// Voice CRUD.
// Filename for voice data.
const voiceJsonBasename = "/voice.json";
export interface recordingsInterface {
  [index: string]: string;
}
// Typing for `state`.
export interface voice {
  dir: string;
  title: string | null;
  desc: string | null;
  numberRecordings: recordingsInterface;
}

// Directory constants.
export const voicesDir = FileSystem.documentDirectory + "voices/";
export const numbersDir = "numbers/";

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
          numberRecordings: {},
        };
        try {
          voiceVals = JSON.parse(
            await FileSystem.readAsStringAsync(
              voicesDir + voiceDir + voiceJsonBasename,
            ),
          );
        } catch (err) {
          console.error("Failed while getting voices", err);
        }
        return voiceVals;
      }),
    );
  }
  return voices;
});

// Write a voice JSON file.
const writeVoiceJson = async (voiceIn: voice) => {
  return await FileSystem.writeAsStringAsync(
    voiceIn.dir + voiceJsonBasename,
    JSON.stringify(voiceIn),
  );
};

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
  await forceCreateDir(voiceDir + "/" + numbersDir);

  const voice = {
    dir: voiceDir,
    title: null,
    desc: null,
    numberRecordings: {},
  };
  writeVoiceJson(voice);

  return voice;
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
    await writeVoiceJson(voiceIn);
    return voiceIn;
  },
);
