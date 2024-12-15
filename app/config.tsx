import { Switch, Text, Button } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  switchDarkTheme,
  selectSettings,
  switchAutoPlay,
  switchShuffle,
} from "../store/settingsSlice";

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
    <SafeAreaView>
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
        <Text>{t("autoplay")}</Text>
        <Switch
          value={settings.autoPlay}
          onValueChange={(value) => {
            dispatch(switchAutoPlay());
          }}
        />
        <Text>{t("shuffle")}</Text>
        <Switch
          value={settings.shuffle}
          onValueChange={(value) => {
            dispatch(switchShuffle());
          }}
        />
        <Button
          testID="voices"
          title={t("voicesTitle")}
          onPress={() => router.push("/voices")}
        />
        <Button
          testID="customTopics"
          title={t("customTopicsTitle")}
          onPress={() => router.push("/custom/editCustomTopics")}
        />
        <Button
          testID="docs"
          title={t("docs")}
          onPress={() =>
            Linking.openURL("https://willtp87.github.io/in-your-voices/")
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
