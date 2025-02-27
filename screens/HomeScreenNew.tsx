// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
//   Image,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "./types"; // Ensure this is correct

// type HomeScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
// };

// const subjects: Array<keyof typeof models> = [
//   "Chemistry",
//   "Biology",
//   "Physics",
//   "Astronomy",
// ];

// const models = {
//   Chemistry: [
//     { name: "Water molecule", id: 1 },
//     { name: "Oxygen atom", id: 2 },
//     { name: "Diamond", id: 3 },
//   ],
//   Biology: [
//     { name: "Heart", id: 4 },
//     { name: "Brain", id: 5 },
//     { name: "Eye", id: 6 },
//   ],
//   Physics: [
//     { name: "Magnetic field of solenoid", id: 7 },
//     { name: "Prism", id: 8 },
//     { name: `Newton's Craddle`, id: 9 },
//     { name: "Nuclear Fission", id: 10 },
//     { name: "Cathode Ray", id: 11 },
//   ],
//   Astronomy: [
//     { name: "Blackhole", id: 12 },
//     { name: "Earth", id: 13 },
//     { name: "Jupiter", id: 14 },
//     { name: "Saturn", id: 15 },
//     { name: "Venus", id: 16 },
//   ],
// };

// const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
//   const [selectedSubject, setSelectedSubject] =
//     useState<keyof typeof models>("Chemistry");

//   // Handle navigation to ARSceneScreen with the modelName
//   const handleModelPress = (modelName: string) => {
//     navigation.navigate("ARSceneScreen", { modelName });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <StatusBar
//         translucent
//         backgroundColor="#fff"
//         barStyle="dark-content" // Use 'dark-content' if your background is light
//       />
//       <View style={styles.header}>
//         <Text style={styles.title}>ARia</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
//           <Image
//             source={require("../assets/icons/settings.png")}
//             style={styles.settingsIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={models[selectedSubject]}
//         keyExtractor={(item) => item.id.toString()}
//         ListHeaderComponent={
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.subjectNav}
//             contentContainerStyle={{ flexGrow: 0 }}
//           >
//             {subjects.map((subject) => (
//               <TouchableOpacity
//                 key={subject}
//                 style={[
//                   styles.subjectButton,
//                   selectedSubject === subject && styles.subjectButtonSelected,
//                 ]}
//                 onPress={() => setSelectedSubject(subject)}
//               >
//                 <Text
//                   style={[
//                     styles.subjectButtonText,
//                     selectedSubject === subject &&
//                       styles.subjectButtonTextSelected,
//                   ]}
//                 >
//                   {subject}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.modelItem}
//             onPress={() => handleModelPress(item.name)}
//           >
//             <Text style={styles.modelText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.modelList}
//       />
//     </SafeAreaView>
//   );
// };

// export default HomeScreenNew;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   settingsIcon: {
//     width: 24,
//     height: 24,
//   },
//   subjectNav: {
//     marginTop: 10,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   subjectButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     backgroundColor: "#f1f1f1",
//     marginRight: 10,
//     height: 40,
//   },
//   subjectButtonSelected: {
//     backgroundColor: "#5780ef",
//   },
//   subjectButtonText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   subjectButtonTextSelected: {
//     color: "#fff",
//   },
//   modelList: {
//     paddingHorizontal: 16,
//     flex: 1,
//   },
//   modelItem: {
//     marginTop: 10,
//     padding: 20,
//     marginBottom: 10,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 10,
//   },
//   modelText: {
//     fontSize: 18,
//     color: "#000",
//   },
// });


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
import { RootStackParamList } from "./types"; // Ensure this is correct

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

const subjects = ["Chemistry", "Biology", "Physics", "Astronomy"] as const;
type Subject = (typeof subjects)[number];

const models: Record<Subject, { name: string; file: string; id: number }[]> = {
  Chemistry: [
    { name: "Water molecule", file: "molecule_structure.glb", id: 1 },
    { name: "Oxygen atom", file: "oxy-atom.glb", id: 2 },
    { name: "Diamond", file: "diamond.glb", id: 3 },
  ],
  Biology: [
    { name: "Heart", file: "heart.glb", id: 4 },
    { name: "Brain", file: "brain.glb", id: 5 },
    { name: "Eye", file: "eye.glb", id: 6 },
  ],
  Physics: [
    { name: "Magnetic field of solenoid", file: "brain.glb", id: 7 },
    { name: "Prism", file: "brain.glb", id: 8 },
    { name: `Newton's Cradle`, file: "brain.glb", id: 9 },
    { name: "Nuclear Fission", file: "brain.glb", id: 10 },
    { name: "Cathode Ray", file: "brain.glb", id: 11 },
  ],
  Astronomy: [
    { name: "Blackhole", file: "brain.glb", id: 12 },
    { name: "Earth", file: "brain.glb", id: 13 },
    { name: "Jupiter", file: "brain.glb", id: 14 },
    { name: "Saturn", file: "brain.glb", id: 15 },
    { name: "Venus", file: "brain.glb", id: 16 },
  ],
};

const HomeScreenNew: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Chemistry");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>ARia</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image source={require("../assets/icons/settings.png")} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={models[selectedSubject]}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectNav}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[styles.subjectButton, selectedSubject === subject && styles.subjectButtonSelected]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[styles.subjectButtonText, selectedSubject === subject && styles.subjectButtonTextSelected]}
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
            onPress={() => navigation.navigate("ARSceneScreen", { modelName: item.name, modelFileName: item.file })}
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
  settingsIcon: { width: 24, height: 24 },
  subjectNav: { marginTop: 10, marginBottom: 20, paddingHorizontal: 10 },
  subjectButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: "#f1f1f1", marginRight: 10, height: 40 },
  subjectButtonSelected: { backgroundColor: "#5780ef" },
  subjectButtonText: { fontSize: 16, color: "#333" },
  subjectButtonTextSelected: { color: "#fff" },
  modelList: { paddingHorizontal: 16, flex: 1 },
  modelItem: { marginTop: 10, padding: 20, marginBottom: 10, backgroundColor: "#e0e0e0", borderRadius: 10 },
  modelText: { fontSize: 18, color: "#000" },
});
