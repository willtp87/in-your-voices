import React from "react";
import { StyleSheet, View } from "react-native";

export default function Circles({ count }: { count: number }) {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push(<View key={i} style={styles.circle} />);
  }
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {circles}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "red",
    margin: 5,
  },
});
