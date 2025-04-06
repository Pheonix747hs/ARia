import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Data/types";
import { Linking } from "react-native";

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "SettingsScreen"
>;

const SettingsScreen: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const backIcon = require("../assets/icons/back2.png");

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Header with back button and "Settings" title */}
      <View
        style={[
          styles.header,
          darkMode ? styles.darkHeader : styles.lightHeader,
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { zIndex: 9999 }]}
        >
          <Image
            source={backIcon}
            style={[
              styles.backIcon,
              darkMode && { tintColor: "rgb(196, 180, 223)" },
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            darkMode && { color: "rgb(196, 180, 223)" },
          ]}
        >
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme Toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        {/* Placeholder Button */}
        {/* <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: darkMode ? "rgb(196, 180, 223)" : "#5780ef" },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: darkMode ? "black" : "white" }]}
          >
            Manage Account
          </Text>
        </TouchableOpacity> */}

        {/* Privacy Policy & Terms of Use */}
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.textButton}
          onPress={() =>
            Linking.openURL(
              "https://www.freeprivacypolicy.com/live/17feb483-5571-44c8-b586-eb14e25f7c61"
            )
          }
        >
          <Text style={[styles.textButtonText, darkMode && styles.darkText]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() =>
            Linking.openURL(
              "https://www.freeprivacypolicy.com/live/590839d3-c13b-40bd-aa49-e9d967b4a681"
            )
          }
        >
          <Text style={[styles.textButtonText, darkMode && styles.darkText]}>
            Terms of Use
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  lightHeader: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
  },
  darkHeader: {
    backgroundColor: "#333",
    borderBottomColor: "#444",
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  textButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  textButtonText: {
    fontSize: 16,
    color: "#5780ef",
  },
});
