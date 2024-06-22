import { ThemeProvider, Text, createTheme } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "intl-pluralrules";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import TimeInApp from "../components/TimeInApp";
import { store } from "../store";

const theme = createTheme({});

export default function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Text>{t("helloWorld")}</Text>
          <StatusBar style="auto" />
          <TimeInApp />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
});
