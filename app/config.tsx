import { Switch, Text, Button } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { switchDarkTheme, selectSettings } from "../store/settingsSlice";

import "../i18n/i18n";

// Configuration entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: t("settingsTitle") });
  }, [t, navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
      }}
    >
      <Text>{t("darkMode")}</Text>
      <Switch
        value={settings.darkTheme}
        onValueChange={(value) => {
          dispatch(switchDarkTheme());
        }}
      />
      <Button title={t("voicesTitle")} onPress={() => router.push("/voices")} />
    </ScrollView>
  );
}
