import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Recorder from "../../components/Recorder";
import { selectManagingTopic } from "../../store/customTopicsSlice";
import { useAppSelector } from "../../store/hooks";
import { voice } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// Screen to record custom cards.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const managingTopic = useAppSelector(selectManagingTopic);

  useEffect(() => {
    navigation.setOptions({ title: t("recordCustomTopicTitle") });
  }, [t, navigation, managingVoice]);
  const recordingsType = managingTopic?.recordingsType;
  const recordingsDir = managingTopic?.recordingsType;

  // Generate recordings list.
  let presentRecordings = managingVoice?.[recordingsType as keyof voice];
  presentRecordings = Array.isArray(presentRecordings) ? presentRecordings : [];

  const recordingsList = managingTopic?.cards.map((card) => {
    const recording = presentRecordings?.find(
      (rec) => rec.machineName === card.machineName,
    )?.recording;
    return {
      machineName: card.machineName,
      label: card.title ?? card.machineName,
      recording: recording ? recording : "",
    };
  });

  return (
    recordingsList &&
    recordingsType &&
    recordingsDir && (
      <SafeAreaView
        style={{
          padding: 15,
        }}
      >
        <Recorder
          recordings={recordingsList}
          recordingsType={recordingsType}
          recordingsDir={recordingsDir}
        />
      </SafeAreaView>
    )
  );
}
