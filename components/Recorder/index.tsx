import { Text, ListItem, Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { ScrollView } from "react-native";

import { play, startRecording, stopRecording } from "../../lib/sound";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateVoice, recordingsInterface } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// Component to record a set.
export default function Recorder({
  recordings,
  recordingsType,
  recordingsDir,
}: {
  recordings: recordingsInterface;
  recordingsType: string;
  recordingsDir: string;
}) {
  const managingVoice = useAppSelector(selectManagingVoice);
  const [recording, setRecording] = useState<Audio.Recording | null>();
  const [activeRecording, setActiveRecording] = useState<
    number | string | null
  >();
  const dispatch = useAppDispatch();

  return (
    <ScrollView>
      <Text>{managingVoice?.title}</Text>
      <Text>{managingVoice?.desc}</Text>
      {Object.entries(recordings).map((value, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{i}</ListItem.Title>
          </ListItem.Content>
          {!recording && i in recordings && recordings[i] && (
            <Icon
              testID={"play" + i}
              name="play-arrow"
              type="material"
              onPress={() => {
                if (managingVoice) play(recordings[i]);
              }}
            />
          )}
          {recording && activeRecording === i && (
            <Icon
              testID={"stop" + i}
              name="stop"
              type="material"
              onPress={() => {
                if (managingVoice && recording) {
                  const recordingUri = `${managingVoice.dir}/${recordingsDir}${i}.${recording.getURI()?.split(".").pop()}`;
                  stopRecording(recording, recordingUri);

                  recordings[i] = recordingUri;
                  dispatch(
                    updateVoice({
                      ...managingVoice,
                      [recordingsType]: recordings,
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
                setActiveRecording(i);
              }}
            />
          )}
        </ListItem>
      ))}
    </ScrollView>
  );
}
