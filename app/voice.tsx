import { Text, Button } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../store/hooks";
import { selectManagingVoice } from "../store/voicesSlice";

// Specific voice portal.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const managingVoice = useAppSelector(selectManagingVoice);

  useEffect(() => {
    navigation.setOptions({ title: managingVoice?.title ?? t("voiceTitle") });
  }, [t, navigation, managingVoice]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{managingVoice?.desc}</Text>
      <Button
        testID="custom"
        title={t("customTopicsTitle")}
        onPress={() => router.push("/custom/recordCustomTopics")}
      />
      <Button
        testID="numbers"
        title={t("numbersTitle")}
        onPress={() => router.push("/numbers/recordNumbers")}
      />
      <Button
        testID="letters"
        title={t("lettersTitle")}
        onPress={() => router.push("/letters/recordLetters")}
      />
      <Button
        testID="colours"
        title={t("coloursTitle")}
        onPress={() => router.push("/colours/recordColours")}
      />
      <Button
        testID="shapes"
        title={t("shapesTitle")}
        onPress={() => router.push("/shapes/recordShapes")}
      />
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
