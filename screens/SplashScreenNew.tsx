// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   StatusBar,
// } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import LinearGradient from "react-native-linear-gradient";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../Data/types";

// // Define the prop type for the SplashScreen
// type SplashScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, "SplashScreen">;
// };

// const SplashScreenNew: React.FC<SplashScreenProps> = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="#5780ef"
//         barStyle="dark-content" // Use 'dark-content' if your background is light
//       />
//       <LinearGradient
//         colors={["#5780ef", "#ff00a6", "#f8c5a5"]}
//         style={styles.background}
//       >
//         <View style={styles.glassContainer}>
//           <View style={styles.glassBox}>
//             <Text style={styles.splashText}>ARia</Text>
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.startButton}
//           onPress={() => navigation.navigate("HomeScreen")}
//         >
//           <Text style={styles.buttonText}>Let's Get Started!</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// export default SplashScreenNew;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   glassContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 100,
//   },
//   glassBox: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 1)",
//     position: "absolute",
//     shadowColor: "#333",
//     shadowOffset: { width: 50, height: 50 },
//     shadowOpacity: 100,
//     shadowRadius: 20,
//     elevation: 15,
//   },
//   splashText: {
//     fontSize: 50,
//     textAlign: "center",
//     fontWeight: "bold",
//     color: "#000",
//     // textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     // textShadowOffset: { width: 2, height: 2 },
//     // textShadowRadius: 5,
//   },
//   startButton: {
//     marginTop: 100,
//     backgroundColor: "rgba(255, 255, 255, 1)",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 50,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   buttonText: {
//     color: "#000",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Data/types";
import { useTheme } from "../context/ThemeContext";

// Define the prop type for the SplashScreen
type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SplashScreen">;
};

const SplashScreenNew: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { darkMode } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar
        translucent
        backgroundColor={darkMode ? "#121212" : "#5780ef"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />
      <LinearGradient
        colors={darkMode ? ["#121212", "#1e1e1e"] : ["#5780ef", "#ff00a6"]}
        style={styles.background}
      >
        <Animated.View style={[styles.glassBox, { opacity: fadeAnim }]}>
          <Text style={[styles.splashText, darkMode && styles.splashTextDark]}>
            ARia
          </Text>
        </Animated.View>
        <TouchableOpacity
          style={[styles.startButton, darkMode && styles.startButtonDark]}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>
            Let's Get Started!
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreenNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glassBox: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  splashText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
  },
  splashTextDark: {
    color: "#fff",
  },
  startButton: {
    marginTop: 100,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 5,
  },
  startButtonDark: {
    backgroundColor: "rgba(50, 50, 50, 0.8)",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextDark: {
    color: "#fff",
  },
});
