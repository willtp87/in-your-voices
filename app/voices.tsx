import { Button, Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectVoices, getVoices, createVoice } from "../store/voicesSlice";
import "../i18n/i18n";

// Voices entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const voices = useAppSelector(selectVoices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: t("voicesTitle") });
  }, [t, navigation]);
  useEffect(() => {
    dispatch(getVoices());
  }, [dispatch]);

  const voicesList = [];
  for (let i = 0; i < voices.length; i++) {
    // todo: populate voice view
    voicesList.push(
      <View key={i}>
        <Text>{voices[i].dir}</Text>
      </View>,
    );
  }

  // todo: add metadata to voices
  return (
    <ScrollView
      contentContainerStyle={{
        margin: 25,
      }}
    >
      {voicesList}
      <Button raised title={t("add")} onPress={() => dispatch(createVoice())} />
    </ScrollView>
  );
}
