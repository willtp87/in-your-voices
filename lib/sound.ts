import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

// Library for sound recording and playback.

// Play a sound.
export const play = async (audioFile: string) => {
  const { sound } = await Audio.Sound.createAsync({ uri: audioFile });
  await sound.playAsync();
  // @todo: figure out if we need to unload.
  sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.didJustFinish)
      await sound.unloadAsync();
  });
  //await sound.unloadAsync();
};

// Stop recording a sound.
export const stopRecording = async (
  recording: Audio.Recording,
  targetUri: string,
) => {
  try {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const recordingUri = recording.getURI() ?? "";
    await FileSystem.moveAsync({
      from: recordingUri,
      to: targetUri,
    });
  } catch (err) {
    console.error("Failed to stop/save recording", err);
  }
};

// Record a sound.
export const startRecording = async () => {
  const permissionResponse = await Audio.getPermissionsAsync();
  try {
    if (permissionResponse?.status !== "granted") {
      await Audio.requestPermissionsAsync();
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    return recording;
  } catch (err) {
    console.error("Failed to start recording", err);
  }
};
