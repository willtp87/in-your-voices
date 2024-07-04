import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Number from "../components/Number";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { increment, reset, selectCount } from "../store/numbersSlice";
import "../i18n/i18n";

export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const num = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (num >= 10) {
        dispatch(reset());
        return;
      }
      dispatch(increment());
    }, 5000);

    return () => clearInterval(interval);
  }, [num, dispatch]);

  useEffect(() => {
    navigation.setOptions({ title: t("numbersTitle") });
  }, [t, navigation]);

  return <Number num={num} word={t(`numbers.${num}`)} />;
}
