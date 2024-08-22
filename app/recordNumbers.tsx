import { Text, ListItem, Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../store/hooks";
import { selectMax } from "../store/numbersSlice";
import { selectManagingVoice } from "../store/voicesSlice";

// Screen to record numbers screen.
export default function Page() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const managingVoice = useAppSelector(selectManagingVoice);
  const max = useAppSelector(selectMax);

  useEffect(() => {
    navigation.setOptions({ title: managingVoice?.title });
  }, [t, navigation, managingVoice]);

  return (
    <SafeAreaView>
      <Text>{managingVoice?.desc}</Text>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {Array(max)
          .fill(null)
          .map((value, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{i}</ListItem.Title>
              </ListItem.Content>
              <Icon
                testID={"mic" + i}
                name="mic"
                type="material"
                onPress={() => {}}
              />
            </ListItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
