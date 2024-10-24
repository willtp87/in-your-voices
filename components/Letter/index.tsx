import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

// This component will display a letter in several ways.
export default function Letter({ char, word }: { char: string; word: string }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, padding: 20 }}>
        {char} | {char.toUpperCase()}
      </Text>
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
