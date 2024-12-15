import { Button, ListItem, Icon, Dialog, Input } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getTopics,
  createTopic,
  deleteTopic,
  updateTopic,
} from "../../store/customTopics";
import {
  selectTopics,
  selectManagingTopic,
  setManagingTopic,
} from "../../store/customTopicsSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "../../i18n/i18n";

// Topics entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const topics = useAppSelector(selectTopics);
  const managingTopic = useAppSelector(selectManagingTopic);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [metaDataVisible, setMetaDataVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: t("customTopicsTitle") });
  }, [t, navigation]);
  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {topics.map((topic, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {topic.title ? topic.title : topic.dir.split("/").at(-1)}
              </ListItem.Title>
            </ListItem.Content>
            <Icon
              testID={"edit" + i}
              name="edit"
              type="material"
              onPress={() => {
                dispatch(setManagingTopic(topic));

                // If we don't set these the last edited vals will be used.
                setTitle(topic?.title ?? "");
                setDesc(topic?.desc ?? "");

                setMetaDataVisible(true);
              }}
            />
            <Icon
              testID={"delete" + i}
              name="delete"
              type="material"
              onPress={() => {
                dispatch(setManagingTopic(topic));
                setDeleteVisible(true);
              }}
            />
            <ListItem.Chevron
              testID={"enterTopic" + i}
              onPress={() => {
                dispatch(setManagingTopic(topic));
                router.push("/custom/editCustomTopic");
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
                if (managingTopic) dispatch(deleteTopic(managingTopic.dir));
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
          <Dialog.Title title={t("topicInfo")} />
          <Dialog.Actions>
            <Input
              label={t("title")}
              onChangeText={(value) => setTitle(value)}
              testID="title"
              defaultValue={managingTopic?.title ?? ""}
            />
            <Input
              label={t("description")}
              onChangeText={(value) => setDesc(value)}
              testID="description"
              defaultValue={managingTopic?.desc ?? ""}
            />
            <Dialog.Button
              title={t("save")}
              onPress={() => {
                if (managingTopic)
                  dispatch(
                    updateTopic({
                      ...managingTopic,
                      title,
                      desc,
                    }),
                  );
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
          onPress={() => dispatch(createTopic())}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
