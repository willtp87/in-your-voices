import { Button, Icon } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TimeInApp from "../components/TimeInApp";
import VoiceSelect from "../components/VoiceSelect";

// Main app screen.
export default function Index() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title: t("mainTitle") });
  }, [t, navigation]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        <StatusBar style="auto" />
        <VoiceSelect />
        <TimeInApp />
        <Button
          testID="custom"
          title={t("customTopicsTitle")}
          onPress={() => router.push("/custom/customTopics")}
        />
        <Button
          testID="numbers"
          title={t("numbersTitle")}
          onPress={() => router.push("/numbers/numbers")}
        />
        <Button
          testID="letters"
          title={t("lettersTitle")}
          onPress={() => router.push("/letters/letters")}
        />
        <Button
          testID="colours"
          title={t("coloursTitle")}
          onPress={() => router.push("/colours/colours")}
        />
        <Button
          testID="shapes"
          title={t("shapesTitle")}
          onPress={() => router.push("/shapes/shapes")}
        />
        <Icon
          testID="config"
          name="settings"
          type="material"
          onPress={() => router.push("/config")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
