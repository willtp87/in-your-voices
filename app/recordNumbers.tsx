import { Text, ListItem, Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { play, startRecording, stopRecording } from "../lib/sound";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectMax, selectDir } from "../store/numbersSlice";
import { updateVoice } from "../store/voices";
import { selectManagingVoice } from "../store/voicesSlice";

// Screen to record numbers.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const max = useAppSelector(selectMax);
  const numbersDir = useAppSelector(selectDir);
  const [recording, setRecording] = useState<Audio.Recording | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: t("recordNumbersTitle") });
  }, [t, navigation, managingVoice]);

  return (
    <SafeAreaView
      style={{
        padding: 15,
      }}
    >
      <Text>{managingVoice?.title}</Text>
      <Text>{managingVoice?.desc}</Text>
      <ScrollView>
        {Array(max)
          .fill(null)
          .map((value, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{i}</ListItem.Title>
              </ListItem.Content>
              {!recording &&
                managingVoice?.numberRecordings &&
                i in managingVoice.numberRecordings && (
                  <Icon
                    testID={"play" + i}
                    name="play-arrow"
                    type="material"
                    onPress={() => {
                      if (managingVoice)
                        play(managingVoice.numberRecordings[i]);
                    }}
                  />
                )}
              {recording && (
                <Icon
                  testID={"stop" + i}
                  name="stop"
                  type="material"
                  onPress={() => {
                    if (managingVoice && recording) {
                      const recordingUri = `${managingVoice.dir}/${numbersDir}${i}.${recording.getURI()?.split(".").pop()}`;
                      stopRecording(recording, recordingUri);

                      const recordings = { ...managingVoice.numberRecordings };
                      recordings[i] = recordingUri;
                      dispatch(
                        updateVoice({
                          ...managingVoice,
                          numberRecordings: recordings,
                        }),
                      );
                      setRecording(null);
                    }
                  }}
                />
              )}
              {!recording && (
                <Icon
                  testID={"mic" + i}
                  name="mic"
                  type="material"
                  onPress={async () => {
                    setRecording(await startRecording());
                  }}
                />
              )}
            </ListItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
