import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Recorder from "../components/Recorder";
import { useAppSelector } from "../store/hooks";
import {
  selectMax,
  selectDir,
  selectRecordingsType,
} from "../store/numbersSlice";
import { voice } from "../store/voices";
import { selectManagingVoice } from "../store/voicesSlice";

// Screen to record numbers.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const recordingsType = useAppSelector(selectRecordingsType);
  const max = useAppSelector(selectMax);
  const numbersDir = useAppSelector(selectDir);

  useEffect(() => {
    navigation.setOptions({ title: t("recordNumbersTitle") });
  }, [t, navigation, managingVoice]);

  // Generate recordings list if none found and expanding if max changes.
  let presentRecordings = managingVoice?.[recordingsType as keyof voice] ?? [];
  if (!Array.isArray(presentRecordings)) presentRecordings = [];
  const missingEntries = Array(max + 1 - presentRecordings.length)
    .fill(null)
    .map((entry, i) => {
      return {
        machineName: `${i + presentRecordings.length}`,
        recording: "",
      };
    });
  const recordings = missingEntries
    ? presentRecordings.concat(missingEntries)
    : presentRecordings;
  // Make sure all entries have a label.
  const recordingsList = recordings.map((rec, i) => ({
    ...rec,
    label: `${i}`,
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
        recordingsDir={numbersDir}
      />
    </SafeAreaView>
  );
}
