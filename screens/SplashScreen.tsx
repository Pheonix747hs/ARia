import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

// Define the prop type for the SplashScreen
type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SplashScreen">;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#5780ef"
        barStyle="dark-content" // Use 'dark-content' if your background is light
      />
      <LinearGradient
        colors={["#5780ef", "#ff00a6", "#f8c5a5"]}
        style={styles.background}
      >
        <View style={styles.glassContainer}>
          <View style={styles.glassBox}>
            <Text style={styles.splashText}>ARia</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("ARSceneScreen")}
        >
          <Text style={styles.buttonText}>Let's Get Started!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glassContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  glassBox: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    position: "absolute",
    shadowColor: "#333",
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 15,
  },
  splashText: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
    // textShadowColor: 'rgba(0, 0, 0, 0.2)',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 5,
  },
  startButton: {
    marginTop: 100,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
