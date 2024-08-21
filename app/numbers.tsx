import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Number from "../components/Number";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  increment,
  reset,
  selectCount,
  selectMax,
} from "../store/numbersSlice";
import "../i18n/i18n";

// Numbers screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const num = useAppSelector(selectCount);
  const max = useAppSelector(selectMax);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (num >= max) {
        dispatch(reset());
        return;
      }
      dispatch(increment());
    }, 5000);

    return () => clearInterval(interval);
  }, [num, max, dispatch]);

  useEffect(() => {
    navigation.setOptions({ title: t("numbersTitle") });
  }, [t, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Number num={num} word={t(`numbers.${num}`)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
