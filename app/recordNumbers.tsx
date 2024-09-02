import { Text, ListItem, Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { play, startRecording, stopRecording } from "../lib/sound";
import { useAppSelector } from "../store/hooks";
import { selectMax, selectDir } from "../store/numbersSlice";
import { selectManagingVoice } from "../store/voicesSlice";

// Screen to record numbers.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const max = useAppSelector(selectMax);
  const numbersDir = useAppSelector(selectDir);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();

  useEffect(() => {
    navigation.setOptions({ title: managingVoice?.title });
  }, [t, navigation, managingVoice]);

  return (
    <SafeAreaView
      style={{
        padding: 15,
      }}
    >
      <Text>{managingVoice?.desc}</Text>
      <ScrollView>
        {Array(max)
          .fill(null)
          .map((value, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{i}</ListItem.Title>
              </ListItem.Content>
              <Icon
                testID={"play" + i}
                name="play-arrow"
                type="material"
                onPress={() => {
                  play(`${managingVoice?.dir}${numbersDir}${i}.m4a`);
                }}
              />
              <Icon
                testID={"stop" + i}
                name="stop"
                type="material"
                onPress={() => {
                  if (recording)
                    // @todo Store/access recordings in state.
                    // @todo get extension from recording uri.
                    stopRecording(
                      recording,
                      `${managingVoice?.dir}${numbersDir}${i}.m4a`,
                    );
                }}
              />
              <Icon
                testID={"mic" + i}
                name="mic"
                type="material"
                onPress={async () => {
                  setRecording(await startRecording());
                }}
              />
            </ListItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
