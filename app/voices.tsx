import { Button, ListItem } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

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

  // @todo: add metadata to voices
  // @todo: delet voices
  // @todo: populate list view
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {voices.map((voice, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{voices[i].dir}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <Button raised title={t("add")} onPress={() => dispatch(createVoice())} />
    </ScrollView>
  );
}
