// ./Data/Colors.ts

export const Colors = {
  light: {
    // Light Mode Colors
    background: "rgba(255,252,239,1)", // Ivory White (#FFFCEF)
    primary: "#9ec6f3", // Cool Teal (#5C899D)
    text: "rgba(0,0,0,1)", // Black text for contrast
    header: "rgba(255,252,239,1)", // Ivory White header background
    border: "rgba(92,137,157,0.3)", // Cool Teal with reduced opacity for borders
    placeholder: "rgba(92,137,157,0.7)", // Slightly opaque Cool Teal for placeholder text
    inputBackground: "rgba(255,252,239,1)", // Ivory White for inputs
    darkprimary: "rgb(69, 125, 149)",
    usermessage: "#9ec6f3",
    botmessage: "#fffcef",
  },
  dark: {
    // Dark Mode Colors
    background: "rgba(46,46,46,1)", // Deep Charcoal (#2E2E2E)
    primary: "rgb(196, 180, 223)", // Muted Lilac (#D6CFE1)
    text: "rgba(255,255,255,1)", // White text for contrast
    header: "rgb(41, 41, 41)", // Deep Charcoal header background
    border: "rgba(207, 195, 227, 0.63)", // Muted Lilac with reduced opacity for borders
    placeholder: "rgba(214,207,225,0.7)", // Slightly opaque Muted Lilac for placeholder text
    inputBackground: "rgba(46,46,46,1)", // Deep Charcoal for inputs
    darkprimary: "rgb(153, 116, 218)",
    usermessage: "#dad2ff",
    botmessage: "#ffffff",
  },
};
// [For Aryan]
// You can change around the colors if you wish, just make sure that if you add
// a new color add a equivalent color for both light and dark themes
`
Example

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styles/colors";

const MyComponent = () => {
  const { darkMode } = useTheme();
  const themeColors = darkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={{ color: themeColors.text }}>Hello, World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MyComponent;
`;
