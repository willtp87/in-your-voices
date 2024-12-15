import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Player from "../../components/Player";
import { selectActiveTopic } from "../../store/customTopicsSlice";
import { useAppSelector } from "../../store/hooks";
import { voice } from "../../store/voices";
import { selectActiveVoice } from "../../store/voicesSlice";

import "../../i18n/i18n";

// Play custom topic screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const activeVoice = useAppSelector(selectActiveVoice);
  const activeTopic = useAppSelector(selectActiveTopic);
  useEffect(() => {
    navigation.setOptions({ title: activeTopic?.title ?? t("cards") });
  }, [t, navigation, activeTopic]);

  if (!activeTopic) return;

  let recordings = activeVoice?.[activeTopic.recordingsType as keyof voice];
  recordings = Array.isArray(recordings) ? recordings : [];
  const playlist = activeTopic.cards.map((card, i) => {
    const recording = recordings?.find(
      (rec) => rec.machineName === card.machineName,
    )?.recording;
    return {
      machineName: card.machineName,
      recording: recording ? recording : "",
      children: (
        <View style={styles.container}>
          {card.title && <Text h1>{`${card.title}`}</Text>}
          {card.image && (
            <Image
              style={[{ width: "100%", flex: 1 }, { resizeMode: "contain" }]}
              source={{ uri: card?.image }}
            />
          )}
          {card.desc && <Text h2>{`${card.desc}`}</Text>}
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
    justifyContent: "center",
    alignItems: "center",
  },
});
