import { Button, ListItem, Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  selectVoices,
  getVoices,
  createVoice,
  deleteVoice,
} from "../store/voicesSlice";
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

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {voices.map((voice, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{voice.dir}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name="delete"
              type="material"
              onPress={() => dispatch(deleteVoice(voice.dir))}
            />
          </ListItem>
        ))}
        <Button
          raised
          title={t("add")}
          onPress={() => dispatch(createVoice())}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
