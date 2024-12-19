import { Text, Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Player from "../../components/Player";
import { useAppSelector } from "../../store/hooks";
import { selectShapes } from "../../store/shapesSlice";
import { selectActiveVoice } from "../../store/voicesSlice";

import "../../i18n/i18n";

// Shapes screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const activeVoice = useAppSelector(selectActiveVoice);
  const shapes = useAppSelector(selectShapes);
  useEffect(() => {
    navigation.setOptions({ title: t("shapesTitle") });
  }, [t, navigation]);
  const playlist = shapes.map((shape, i) => {
    return {
      machineName: shape,
      recording: activeVoice ? activeVoice?.shapeRecordings[i]?.recording : "",
      children: (
        <View style={styles.container}>
          <Text h1>{t(`shapes.${shape}`)}</Text>
          {shape === "circle" && (
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                backgroundColor: "red",
                margin: 15,
              }}
            />
          )}
          {shape === "triangle" && (
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 100,
                borderLeftColor: "transparent",
                borderRightWidth: 100,
                borderRightColor: "transparent",
                borderBottomWidth: 100,
                borderBottomColor: "red",
                margin: 15,
              }}
            />
          )}
          {shape === "square" && (
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "red",
                margin: 15,
              }}
            />
          )}
          {shape === "rectangle" && (
            <View
              style={{
                width: "50%",
                height: "50%",
                backgroundColor: "red",
                margin: 15,
              }}
            />
          )}
          {shape === "oval" && (
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "red",
                transform: [{ scaleX: 0.8 }],
                margin: 15,
              }}
            />
          )}
          {shape === "heart" && (
            <Icon name="favorite" type="material" color="red" size={200} />
          )}
          {shape === "star" && (
            <Icon name="star" type="material" color="red" size={200} />
          )}
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
    justifyContent: "center",
  },
});
