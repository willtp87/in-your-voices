import { Icon } from "@rneui/themed";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { shuffleArray } from "../../lib/datastructures";
import { play } from "../../lib/sound";
import { useAppSelector } from "../../store/hooks";
import { selectSettings } from "../../store/settingsSlice";
import { selectActiveVoice } from "../../store/voicesSlice";

// recordingsInterface with a label.
export interface playlistInterface {
  machineName: string;
  recording: string;
  children: ReactNode;
}
// Component to play a playlist.
export default function Player({
  playlist,
}: {
  playlist: playlistInterface[];
}) {
  const [position, setPosition] = useState(0);
  const settings = useAppSelector(selectSettings);
  const activeVoice = useAppSelector(selectActiveVoice);
  const [init, setInit] = useState(true);

  // Increment and play playlist.
  const next = useCallback(() => {
    if (position >= playlist.length - 1) {
      setPosition(0);
      if (activeVoice && 0 in playlist) {
        if (playlist[0].recording) play(playlist[0].recording);
      }
      return;
    }
    if (activeVoice && position + 1 in playlist) {
      if (playlist[position + 1].recording)
        play(playlist[position + 1].recording);
    }
    setPosition(position + 1);
  }, [position, activeVoice, playlist]);

  // Decrement and play playlist.
  const prev = useCallback(() => {
    if (activeVoice && position in playlist) {
      if (playlist[position - 1].recording)
        play(playlist[position - 1].recording);
    }
    setPosition(position - 1);
  }, [position, activeVoice, playlist]);

  // Autoplay timer.
  useEffect(() => {
    const interval = setInterval(() => {
      // Do nothing on timer if autoplay disabled.
      if (!settings.autoPlay) return;
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [position, activeVoice, settings.autoPlay, next]);

  // On first load.
  useEffect(() => {
    if (init) {
      setInit(false);
      // Shuffle
      if (settings.shuffle) shuffleArray(playlist);
      // Play.
      if (activeVoice && position === 0 && 0 in playlist) {
        if (playlist[position].recording) play(playlist[position].recording);
      }
    }
  }, [position, activeVoice, init, playlist, settings]);

  return (
    <View style={styles.container}>
      {!settings.autoPlay && (
        <Icon
          testID="prev"
          name="skip-previous"
          type="material"
          size={40}
          onPress={prev}
          disabled={position === 0}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
      {playlist[position]?.children}
      {!settings.autoPlay && (
        <Icon
          testID="next"
          name="skip-next"
          type="material"
          size={40}
          onPress={next}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
