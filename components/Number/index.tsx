import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import Circles from "../Circles";

// This component will display a number in several ways.
export default function Number({ num, word }: { num: number; word: string }) {
  return (
    <View style={styles.container}>
      <Circles count={num} />
      <Text h2>{num}</Text>
      <Text h2>{word}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
