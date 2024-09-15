import { Picker } from "@react-native-picker/picker";
import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import "../../i18n/i18n";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getVoices } from "../../store/voices";
import {
  selectVoices,
  selectActiveVoice,
  setActiveVoice,
} from "../../store/voicesSlice";

// This component lets you switch the voice.
export default function VoiceSelect() {
  const { t } = useTranslation();
  const voices = useAppSelector(selectVoices);
  const selectedVoice = useAppSelector(selectActiveVoice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVoices());
  }, [dispatch]);

  return (
    <View style={{ padding: 10 }}>
      <Text>{t("voiceSelect")}</Text>
      <Picker
        selectedValue={selectedVoice?.dir ?? t("none")}
        style={{ backgroundColor: "#0000FF" }}
        onValueChange={(itemValue) =>
          dispatch(
            setActiveVoice(voices.find((voice) => voice?.dir === itemValue)),
          )
        }
      >
        <Picker.Item
          color="#F0FFFF"
          key="none"
          label={t("none")}
          value="none"
        />
        {voices.map((voice, i) => (
          <Picker.Item
            key={i}
            label={voice.title ?? voice.dir.split("/").at(-1)}
            value={voice.dir}
            color="#F0FFFF"
          />
        ))}
      </Picker>
    </View>
  );
}
