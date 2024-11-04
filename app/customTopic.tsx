import { Button, ListItem, Icon, Dialog, Input } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getTopics,
  createCard,
  deleteCard,
  updateCard,
  moveCardUp,
  moveCardDown,
} from "../store/customTopics";
import {
  selectManagingTopic,
  selectManagingCard,
  setManagingCard,
} from "../store/customTopicsSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import "../i18n/i18n";

// Cards entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingCard = useAppSelector(selectManagingCard);
  const managingTopic = useAppSelector(selectManagingTopic);
  const dispatch = useAppDispatch();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [metaDataVisible, setMetaDataVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: managingTopic?.title ?? t("cards") });
  }, [managingTopic?.title, navigation, t]);
  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const cards = managingTopic?.cards ?? [];
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {cards.map((card, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {card.title ? card.title : card.machineName}
              </ListItem.Title>
            </ListItem.Content>
            <Icon
              testID={"camera" + i}
              name="photo-camera"
              type="material"
              onPress={() => {
                // @todo Implement.
              }}
            />
            <Icon
              testID={"up" + i}
              name="arrow-upward"
              type="material"
              onPress={() => {
                moveCardUp(card);
              }}
            />
            <Icon
              testID={"down" + i}
              name="arrow-downward"
              type="material"
              onPress={() => {
                moveCardDown(card);
              }}
            />
            <Icon
              testID={"edit" + i}
              name="edit"
              type="material"
              onPress={() => {
                dispatch(setManagingCard(card));

                // If we don't set these the last edited vals will be used.
                setTitle(card?.title ?? "");
                setDesc(card?.desc ?? "");

                setMetaDataVisible(true);
              }}
            />
            <Icon
              testID={"delete" + i}
              name="delete"
              type="material"
              onPress={() => {
                dispatch(setManagingCard(card));
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
                if (managingCard) dispatch(deleteCard(managingCard));
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
          <Dialog.Title title={t("cardInfo")} />
          <Dialog.Actions>
            <Input
              label={t("title")}
              onChangeText={(value) => setTitle(value)}
              testID="title"
              defaultValue={managingCard?.title ?? ""}
            />
            <Input
              label={t("description")}
              onChangeText={(value) => setDesc(value)}
              testID="description"
              defaultValue={managingCard?.desc ?? ""}
            />
            <Dialog.Button
              title={t("save")}
              onPress={() => {
                if (managingCard)
                  dispatch(
                    updateCard({
                      ...managingCard,
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
          onPress={() => {
            if (managingTopic) dispatch(createCard(managingTopic));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
