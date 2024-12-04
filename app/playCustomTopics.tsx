import { ListItem } from "@rneui/themed";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTopics } from "../store/customTopics";
import { selectTopics, setActiveTopic } from "../store/customTopicsSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import "../i18n/i18n";

// Play topics entry screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const topics = useAppSelector(selectTopics);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
            <ListItem.Chevron
              testID={"enterTopic" + i}
              onPress={() => {
                dispatch(setActiveTopic(topic));
                router.push("/playCustomTopic");
              }}
            />
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
