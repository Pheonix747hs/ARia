import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const SettingsScreen: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme(); // Get global theme state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Fixed missing state

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView>
        <Text style={[styles.header, darkMode && styles.darkText]}>
          Settings
        </Text>

        {/* Theme Toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </View>

        {/* Placeholder Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Account</Text>
        </TouchableOpacity>

        {/* Privacy Policy & Terms of Use */}
        <View style={styles.divider} />
        <TouchableOpacity style={styles.textButton}>
          <Text style={[styles.textButtonText, darkMode && styles.darkText]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton}>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  darkText: {
    color: "#fff",
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
  button: {
    backgroundColor: "#5780ef",
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
    marginVertical: 20,
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
