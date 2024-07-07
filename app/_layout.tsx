import {
  ThemeProvider as NavThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";
import "intl-pluralrules";
import "../i18n/i18n";

import { useAppSelector } from "../store/hooks";
import { selectSettings } from "../store/settingsSlice";
import withStore from "../store/withStore";

// App entry.
const Wrapper = function App() {
  const settings = useAppSelector(selectSettings);
  const theme = createTheme(
    settings.darkTheme ? { mode: "dark" } : { mode: "light" },
  );

  return (
    <NavThemeProvider value={settings.darkTheme ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={theme}>
        <Stack />
      </ThemeProvider>
    </NavThemeProvider>
  );
};

export default withStore(Wrapper);
