import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Recorder from "../../components/Recorder";
import {
  selectDir,
  selectRecordingsType,
  selectColours,
} from "../../store/coloursSlice";
import { useAppSelector } from "../../store/hooks";
import { voice } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// Screen to record Colours.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const recordingsType = useAppSelector(selectRecordingsType);
  const colourDir = useAppSelector(selectDir);
  const colours = useAppSelector(selectColours);

  useEffect(() => {
    navigation.setOptions({ title: t("recordColoursTitle") });
  }, [t, navigation, managingVoice]);

  // Generate recordings list.
  const presentRecordings = managingVoice?.[recordingsType as keyof voice];
  const recordings =
    !Array.isArray(presentRecordings) || !presentRecordings.length
      ? colours.map((colour) => ({
          machineName: colour,
          label: t(`colours.${colour}`),
          recording: "",
        }))
      : presentRecordings;

  // Make sure all entries have a label.
  const recordingsList = recordings.map((rec, i) => ({
    ...rec,
    label: t(`colours.${rec.machineName}`),
  }));

  return (
    <SafeAreaView
      style={{
        padding: 15,
      }}
    >
      <Recorder
        recordings={recordingsList}
        recordingsType={recordingsType}
        recordingsDir={colourDir}
      />
    </SafeAreaView>
  );
}
