import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Number from "../components/Number";
import Player from "../components/Player";
import { useAppSelector } from "../store/hooks";
import { selectMax } from "../store/numbersSlice";
import { selectActiveVoice } from "../store/voicesSlice";

import "../i18n/i18n";

// Numbers screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const max = useAppSelector(selectMax);
  const activeVoice = useAppSelector(selectActiveVoice);

  useEffect(() => {
    navigation.setOptions({ title: t("numbersTitle") });
  }, [t, navigation]);

  const playlist = Array(max + 1)
    .fill(null)
    .map((entry, i) => {
      return {
        machineName: `${i}`,
        recording: activeVoice
          ? activeVoice?.numberRecordings[i].recording
          : "",
        children: <Number num={i} word={t(`numbers.${i}`)} />,
      };
    });

  return (
    <SafeAreaView style={styles.container}>
      <Player playlist={playlist} />
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
