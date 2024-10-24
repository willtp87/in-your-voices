import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Letter from "../components/Letter";
import Player from "../components/Player";
import { useAppSelector } from "../store/hooks";
import { selectLetters } from "../store/lettersSlice";
import { selectActiveVoice } from "../store/voicesSlice";

import "../i18n/i18n";

// Letters screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const activeVoice = useAppSelector(selectActiveVoice);
  const letters = useAppSelector(selectLetters);

  useEffect(() => {
    navigation.setOptions({ title: t("lettersTitle") });
  }, [t, navigation]);
  const playlist = letters.map((char, i) => {
    return {
      machineName: char,
      recording: activeVoice ? activeVoice?.letterRecordings[i]?.recording : "",
      children: <Letter char={char} word={t(`letters.${char}`)} />,
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
