import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.textstyle}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textstyle: {
    color: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
