import {
  ThemeProvider as NavThemeProvider,
  DarkTheme,
} from "@react-navigation/native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";
import "intl-pluralrules";
import "../i18n/i18n";
import { Provider } from "react-redux";

import { store } from "../store";

export default function App() {
  const theme = createTheme({ mode: "dark" });
  return (
    <Provider store={store}>
      <NavThemeProvider value={DarkTheme}>
        <ThemeProvider theme={theme}>
          <Stack />
        </ThemeProvider>
      </NavThemeProvider>
    </Provider>
  );
}
