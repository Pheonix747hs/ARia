import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Data/types";
import { subjects, models, Subject } from "../Data/modelData";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { darkMode } = useTheme(); // Get global dark mode state
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Chemistry");

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Status Bar */}
      <StatusBar
        translucent
        backgroundColor={darkMode ? "#181818" : "#f5f5f5"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>ARia</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/icons/settings.png")}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Subject Selection ScrollView */}
      <FlatList
        data={models[selectedSubject]}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.subjectNav}
          >
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectButton,
                  darkMode && styles.darkButton, // Glass effect for dark mode
                  selectedSubject === subject && styles.subjectButtonSelected, // Blue when selected
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectButtonText,
                    darkMode && styles.darkSubjectButtonText, // Apply dark mode text styles
                    selectedSubject === subject &&
                      styles.subjectButtonTextSelected,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.modelItem,
              darkMode && styles.darkModelItem, // Glass-like transparency
            ]}
            onPress={() =>
              navigation.navigate("ARSceneScreen", {
                modelName: item.name,
                modelFileName: item.file,
                description: item.description, // Passing description
              })
            }
          >
            <Text style={[styles.modelText, darkMode && styles.darkText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.modelList}
      />
    </SafeAreaView>
  );
};

export default HomeScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  darkContainer: { backgroundColor: "#222" }, // Softer dark mode

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  darkHeader: { backgroundColor: "#111" },

  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
  darkText: { color: "#fff" },

  settingsIcon: { width: 30, height: 30 },

  subjectNav: { marginTop: 10, marginBottom: 20, paddingHorizontal: 10 },

  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
    backgroundColor: "rgba(200, 200, 200, 0.57)", // Light gray glass effect
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  darkButton: {
    backgroundColor: "rgba(96, 96, 96, 0.68)", // Darker glass effect
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  subjectButtonSelected: {
    backgroundColor: "#5780ef",
    borderColor: "#5780ef",
  },
  darkSubjectButtonText: {
    color: "#d1d1d1", // Softer white in dark mode
    fontWeight: "600", // Slightly bold for better visibility
    textShadowColor: "rgba(255, 255, 255, 0.3)", // Glow effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  subjectButtonText: { fontSize: 16, color: "#000" },
  subjectButtonTextSelected: { color: "#fff" },

  modelList: { paddingHorizontal: 16, flex: 1 },

  modelItem: {
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.14)", // Transparent white for glass effect
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  darkModelItem: {
    backgroundColor: "rgba(92, 92, 92, 0.3)", // Darker glass effect
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  modelText: { fontSize: 18, color: "#000" },
});
