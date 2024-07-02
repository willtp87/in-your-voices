import { Button } from "@rneui/themed";
import { Link, useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import TimeInApp from "../components/TimeInApp";

export default function Index() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title: t("mainTitle") });
  }, [t, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Link href="/Numbers">
        <Button
          title={t("numbersTitle")}
          onPress={() => router.push("/Numbers")}
        />
      </Link>
      <TimeInApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
