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
import { Colors } from "../Data/Colors";

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreenNew">;
};

const subjectImages = {
  Chemistry: require("../assets/chemistry.jpeg"),
  Biology: require("../assets/biology.png"),
  Physics: require("../assets/physics.jpg"),
  Astronomy: require("../assets/astronomy.png"),
};

const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const themeColors = darkMode ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar
        translucent
        backgroundColor={darkMode ? "#181818" : "#f5f5f5"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />

      {/* Header with Logo and Title */}
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={[styles.title, darkMode && styles.darkText]}>ARia</Text>
        </View>
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

        {/* Subject-Specific Image */}
        <Image
          source={subjectImages[selectedSubject]}
          style={styles.subjectImage}
        />

        <FlatList
          data={models[selectedSubject] || []} // Ensure no crash if subject is missing
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.modelItem, darkMode && styles.darkModelItem]}
              onPress={() =>
                navigation.navigate("ARSceneScreenNew", {
                  modelName: item.name,
                  modelFileName: item.file,
                  description: item.description,
                  scale: item.scale,
                  rotation: item.rotation,
                  position: item.position,
                })
              }
            >
              <Text style={[styles.modelText]}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.modelList}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.floatingButton,
          { backgroundColor: themeColors.primary },
        ]}
        onPress={() => navigation.navigate("ChatScreen", {})}
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFCEF" },
  darkContainer: { backgroundColor: "#333" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFCEF",
  },
  darkHeader: { backgroundColor: "#333" },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
    marginLeft: -14, // Moves the title slightly to the left
    marginTop: 10,
  },
  darkText: { color: "#fff" },

  settingsIcon: { width: 30, height: 30 },

  subjectNav: { marginTop: 10, marginBottom: 10, paddingHorizontal: 10 }, // Removed marginBottom

  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    height: 45,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#999",
  },
  darkButton: {
    backgroundColor: "#FFFCEF",
    borderColor: "#999",
  },
  subjectButtonSelected: {
    backgroundColor: "#93c6f3",
    borderColor: "#999",
  },
  darkSubjectButtonText: {
    color: "#333",
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  subjectButtonText: { fontSize: 16, color: "#000" },
  subjectButtonTextSelected: { color: "#000" },

  subjectImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },

  modelList: { paddingHorizontal: 16 }, // Removed paddingTop

  modelItem: {
    marginTop: 5,
    padding: 20,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
  darkModelItem: {
    backgroundColor: "#FFFCEF",
    borderColor: "#999",
  },

  modelText: { fontSize: 18, color: "#000" },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#93c6f3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
