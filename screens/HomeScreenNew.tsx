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

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Chemistry");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>ARia</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/icons/settings.png")}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

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
                  selectedSubject === subject && styles.subjectButtonSelected,
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectButtonText,
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
            style={styles.modelItem}
            onPress={() =>
              navigation.navigate("ARSceneScreen", {
                modelName: item.name,
                modelFileName: item.file,
                description: item.description, // Passing description along with model data
              })
            }
          >
            <Text style={styles.modelText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.modelList}
      />
    </SafeAreaView>
  );
};

export default HomeScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
  settingsIcon: { width: 24, height: 24 },
  subjectNav: { marginTop: 10, marginBottom: 20, paddingHorizontal: 10 },
  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
    height: 40,
  },
  subjectButtonSelected: { backgroundColor: "#5780ef" },
  subjectButtonText: { fontSize: 16, color: "#333" },
  subjectButtonTextSelected: { color: "#fff" },
  modelList: { paddingHorizontal: 16, flex: 1 },
  modelItem: {
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  modelText: { fontSize: 18, color: "#000" },
});
