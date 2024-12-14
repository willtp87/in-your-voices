import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Player from "../../components/Player";
import { selectColours } from "../../store/coloursSlice";
import { useAppSelector } from "../../store/hooks";
import { selectActiveVoice } from "../../store/voicesSlice";

import "../../i18n/i18n";

// Colours screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const activeVoice = useAppSelector(selectActiveVoice);
  const colours = useAppSelector(selectColours);

  useEffect(() => {
    navigation.setOptions({ title: t("coloursTitle") });
  }, [t, navigation]);
  const playlist = colours.map((colour, i) => {
    return {
      machineName: colour,
      recording: activeVoice ? activeVoice?.colourRecordings[i]?.recording : "",
      children: (
        <View style={styles.container}>
          <Text h1>{t(`colours.${colour}`)}</Text>
          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: colour,
              borderColor: "blue",
              borderWidth: 5,
            }}
          />
        </View>
      ),
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
    alignItems: "center",
  },
});
