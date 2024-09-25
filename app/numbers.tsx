import { Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Number from "../components/Number";
import { play } from "../lib/sound";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  decrement,
  increment,
  reset,
  selectCount,
  selectMax,
  selectMin,
} from "../store/numbersSlice";
import { selectSettings } from "../store/settingsSlice";
import { selectActiveVoice } from "../store/voicesSlice";

import "../i18n/i18n";

// Numbers screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const num = useAppSelector(selectCount);
  const max = useAppSelector(selectMax);
  const min = useAppSelector(selectMin);
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const activeVoice = useAppSelector(selectActiveVoice);
  const [init, setInit] = useState(true);

  // Change position in playlist.
  const next = useCallback(() => {
    // Increment and play sound if available.
    if (num >= max) {
      dispatch(reset());
      if (activeVoice && min in activeVoice?.numberRecordings) {
        play(activeVoice.numberRecordings[min]);
      }
      return;
    }
    if (activeVoice && num in activeVoice?.numberRecordings) {
      play(activeVoice.numberRecordings[num + 1]);
    }
    dispatch(increment());
  }, [num, max, min, dispatch, activeVoice]);
  const prev = useCallback(() => {
    // Decrement and play sound if available.
    if (activeVoice && num in activeVoice?.numberRecordings) {
      play(activeVoice.numberRecordings[num - 1]);
    }
    dispatch(decrement());
  }, [num, dispatch, activeVoice]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Do nothing on timer if autoplay disabled.
      if (!settings.autoPlay) return;
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [num, max, min, dispatch, activeVoice, settings.autoPlay, next]);

  useEffect(() => {
    navigation.setOptions({ title: t("numbersTitle") });
    // Play on first load.
    if (init) {
      setInit(false);
      if (activeVoice && min === num && min in activeVoice?.numberRecordings) {
        play(activeVoice.numberRecordings[min]);
      }
    }
  }, [t, navigation, min, num, activeVoice, init]);

  return (
    <SafeAreaView style={styles.container}>
      {!settings.autoPlay && !(num === min) && (
        <Icon
          testID="prev"
          name="skip-previous"
          type="material"
          onPress={prev}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
      <Number num={num} word={t(`numbers.${num}`)} />
      {!settings.autoPlay && (
        <Icon
          testID="next"
          name="skip-next"
          type="material"
          onPress={next}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
