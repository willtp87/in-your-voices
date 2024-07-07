import { Switch, Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { switchDarkTheme, selectSettings } from "../store/settingsSlice";

import "../i18n/i18n";

export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: t("settingsTitle") });
  }, [t, navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        margin: 25,
      }}
    >
      <Text>{t("darkMode")}</Text>
      <Switch
        value={settings.darkTheme}
        onValueChange={(value) => {
          dispatch(switchDarkTheme());
        }}
      />
    </ScrollView>
  );
}
