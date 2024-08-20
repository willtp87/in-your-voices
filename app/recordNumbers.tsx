import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../store/hooks";
import { selectManagingVoice } from "../store/voicesSlice";

// Screen to record numbers screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);

  useEffect(() => {
    navigation.setOptions({ title: managingVoice?.title });
  }, [t, navigation, managingVoice]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{managingVoice?.desc}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
