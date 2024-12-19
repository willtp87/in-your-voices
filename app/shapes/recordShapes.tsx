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
  selectShapes,
} from "../../store/shapesSlice";
import { voice } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// Screen to record Shapes.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const recordingsType = useAppSelector(selectRecordingsType);
  const shapesDir = useAppSelector(selectDir);
  const shapes = useAppSelector(selectShapes);

  useEffect(() => {
    navigation.setOptions({ title: t("recordShapesTitle") });
  }, [t, navigation, managingVoice]);

  // Generate recordings list.
  const presentRecordings = managingVoice?.[recordingsType as keyof voice];
  const recordings =
    !Array.isArray(presentRecordings) || !presentRecordings.length
      ? shapes.map((shape) => ({
          machineName: shape,
          label: t(`shapes.${shape}`),
          recording: "",
        }))
      : presentRecordings;

  // Make sure all entries have a label.
  const recordingsList = recordings.map((rec, i) => ({
    ...rec,
    label: t(`shapes.${rec.machineName}`),
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
        recordingsDir={shapesDir}
      />
    </SafeAreaView>
  );
}
