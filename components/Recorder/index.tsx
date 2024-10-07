import { Text, ListItem, Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { ScrollView } from "react-native";

import { play, startRecording, stopRecording } from "../../lib/sound";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateVoice } from "../../store/voices";
import { selectManagingVoice } from "../../store/voicesSlice";

// recordingsInterface with a label.
export interface recordingsListInterface {
  machineName: string;
  recording: string;
  label: string | null;
}

// Component to record a set.
export default function Recorder({
  recordings,
  recordingsType,
  recordingsDir,
}: {
  recordings: recordingsListInterface[];
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
      {recordings.map((recordingVal, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{recordingVal.label}</ListItem.Title>
          </ListItem.Content>
          {!recording && recordingVal.recording && (
            <Icon
              testID={"play" + i}
              name="play-arrow"
              type="material"
              onPress={() => {
                if (managingVoice) play(recordingVal.recording);
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

                  recordingVal.recording = recordingUri;
                  dispatch(
                    updateVoice({
                      ...managingVoice,
                      [recordingsType]: recordings.map((val) => {
                        const { label, ...rec } = val;
                        return rec;
                      }),
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
