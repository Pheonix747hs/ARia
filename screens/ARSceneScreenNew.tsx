import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { useTheme } from "../context/ThemeContext";
import ARSceneNew from "../Components/ARSceneNew";
import ModalInfoPanel from "../Components/ModalInfoPanel";
import { RootStackParamList } from "../Data/types";
import { StackNavigationProp } from "@react-navigation/stack";

interface ARSceneScreenProps {
  route: {
    params: {
      modelName: string;
      modelFileName: string;
      description: string;
      scale: [number, number, number];
      rotation: [number, number, number];
      position: [number, number, number];
    };
  };
}

const ARSceneScreenNew: React.FC<ARSceneScreenProps> = ({ route }) => {
  const { darkMode } = useTheme();
  const { modelName, modelFileName, description, scale, rotation, position } =
    route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isPanelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (isPanelVisible) {
        setPanelVisible(false);
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [isPanelVisible]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={darkMode ? "#181818" : "#f5f5f5"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />
      <ViroARSceneNavigator
        autofocus
        initialScene={{
          scene: () => (
            <ARSceneNew
              modelName={modelName}
              modelFileName={modelFileName}
              scale={scale}
              rotation={rotation}
              position={position}
            />
          ),
        }}
        style={styles.f1}
      />

      {/* Header overlay */}
      <View
        style={[
          styles.absoluteHeader,
          darkMode ? styles.headerdark : styles.headerlight,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[styles.backText, { color: darkMode ? "white" : "black" }]}
          >
            {"< Back"}
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: darkMode ? "white" : "black" }]}
        >
          {modelName}
        </Text>
        <TouchableOpacity
          onPress={() => setPanelVisible(true)}
          style={styles.infoButton}
        >
          <Image
            source={require("../assets/icons/information.png")}
            style={[
              {
                width: 25,
                height: 25,
                tintColor: darkMode ? "white" : "black",
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Modal Info Panel */}
      <ModalInfoPanel
        visible={isPanelVisible}
        onDismiss={() => setPanelVisible(false)}
        modelName={modelName}
        description={description}
      />
    </SafeAreaView>
  );
};

export default ARSceneScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  f1: { flex: 1 },
  absoluteHeader: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  headerlight: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
  headerdark: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  backText: { fontSize: 18 },
  headerTitle: { flex: 1, fontSize: 20, textAlign: "center" },
  infoButton: { padding: 8 },

  /* Floating Chat Button */
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5780ef",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 5, // Shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
