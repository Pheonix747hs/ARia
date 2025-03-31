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
import { subjects, models } from "../Data/modelData";
import { useTheme } from "../context/ThemeContext";

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar
        translucent
        backgroundColor={darkMode ? "#181818" : "#f5f5f5"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />

      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>ARia</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/icons/settings.png")}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <View>
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
                darkMode && styles.darkButton,
                selectedSubject === subject && styles.subjectButtonSelected,
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text
                style={[
                  styles.subjectButtonText,
                  darkMode && styles.darkSubjectButtonText,
                  selectedSubject === subject &&
                    styles.subjectButtonTextSelected,
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={models[selectedSubject] || []} // Ensure no crash if subject is missing
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.modelItem, darkMode && styles.darkModelItem]}
              onPress={() =>
                navigation.navigate("ARSceneScreen", {
                  modelName: item.name,
                  modelFileName: item.file,
                  description: item.description,
                  scale: item.scale,
                  rotation: item.rotation,
                  position: item.position,
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  darkContainer: { backgroundColor: "#222" },

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

  subjectNav: { marginTop: 10, marginBottom: 10, paddingHorizontal: 10 }, // Removed marginBottom

  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    height: 45,
    backgroundColor: "rgba(200, 200, 200, 0.57)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  darkButton: {
    backgroundColor: "rgba(96, 96, 96, 0.68)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  subjectButtonSelected: {
    backgroundColor: "#5780ef",
    borderColor: "#5780ef",
  },
  darkSubjectButtonText: {
    color: "#d1d1d1",
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  subjectButtonText: { fontSize: 16, color: "#000" },
  subjectButtonTextSelected: { color: "#fff" },

  modelList: { paddingHorizontal: 16 }, // Removed paddingTop

  modelItem: {
    marginTop: 5,
    padding: 20,
    marginBottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  darkModelItem: {
    backgroundColor: "rgba(92, 92, 92, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  modelText: { fontSize: 18, color: "#000" },
});
