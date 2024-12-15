import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Recorder from "../../components/Recorder";
import { useAppSelector } from "../../store/hooks";
import {
  selectDir,
  selectRecordingsType,
  selectLetters,
} from "../../store/lettersSlice";
import { voice } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// Screen to record letters.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const recordingsType = useAppSelector(selectRecordingsType);
  const lettersDir = useAppSelector(selectDir);
  const letters = useAppSelector(selectLetters);

  useEffect(() => {
    navigation.setOptions({ title: t("recordLettersTitle") });
  }, [t, navigation, managingVoice]);

  // Generate recordings list.
  const presentRecordings = managingVoice?.[recordingsType as keyof voice];
  const recordings =
    !Array.isArray(presentRecordings) || !presentRecordings.length
      ? letters.map((char) => ({
          machineName: char,
          label: char.toUpperCase(),
          recording: "",
        }))
      : presentRecordings;

  // Make sure all entries have a label.
  const recordingsList = recordings.map((rec, i) => ({
    ...rec,
    label: rec.machineName.toUpperCase(),
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
        recordingsDir={lettersDir}
      />
    </SafeAreaView>
  );
}
