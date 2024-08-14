import { Button, ListItem, Icon, Dialog, Input } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  selectVoices,
  getVoices,
  createVoice,
  deleteVoice,
  updateVoice,
  voice as voiceType,
} from "../store/voicesSlice";
import "../i18n/i18n";

// Voices entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const voices = useAppSelector(selectVoices);
  const dispatch = useAppDispatch();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [metaDataVisible, setMetaDataVisible] = useState(false);
  const [activeVoice, setActiveVoice] = useState<voiceType>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: t("voicesTitle") });
  }, [t, navigation]);
  useEffect(() => {
    dispatch(getVoices());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {voices.map((voice, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {voice.title ? voice.title : voice.dir.split("/").at(-1)}
              </ListItem.Title>
            </ListItem.Content>
            <Icon
              testID={"edit" + i}
              name="edit"
              type="material"
              onPress={() => {
                setActiveVoice(voice);
                setMetaDataVisible(true);
              }}
            />
            <Icon
              testID={"delete" + i}
              name="delete"
              type="material"
              onPress={() => {
                setActiveVoice(voice);
                setDeleteVisible(true);
              }}
            />
          </ListItem>
        ))}
        <Dialog
          isVisible={deleteVisible}
          onBackdropPress={() => setDeleteVisible(false)}
        >
          <Dialog.Title title={t("pleaseConfirm")} />
          <Dialog.Actions>
            <Dialog.Button
              title={t("confirm")}
              onPress={() => {
                if (activeVoice) dispatch(deleteVoice(activeVoice.dir));
                setDeleteVisible(false);
              }}
            />
            <Dialog.Button
              title={t("cancel")}
              onPress={() => setDeleteVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          isVisible={metaDataVisible}
          onBackdropPress={() => setMetaDataVisible(false)}
        >
          <Dialog.Title title={t("voiceInfo")} />
          <Dialog.Actions>
            <Input
              label={t("title")}
              onChangeText={(value) => setTitle(value)}
              testID="title"
              defaultValue={activeVoice?.title ?? ""}
            />
            <Input
              label={t("description")}
              onChangeText={(value) => setDesc(value)}
              testID="description"
              defaultValue={activeVoice?.desc ?? ""}
            />
            <Dialog.Button
              title={t("save")}
              onPress={() => {
                if (activeVoice)
                  dispatch(updateVoice({ dir: activeVoice.dir, title, desc }));
                setMetaDataVisible(false);
              }}
            />
            <Dialog.Button
              title={t("cancel")}
              onPress={() => setMetaDataVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
        <Button
          raised
          title={t("add")}
          onPress={() => dispatch(createVoice())}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
