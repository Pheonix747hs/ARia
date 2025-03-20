import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  Modal,
  Animated,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { modelSources } from "../Data/modelData";
import { useTheme } from "../context/ThemeContext";

interface ARSceneProps {
  modelName: string;
  modelFileName: string;
}

const ARSceneNew: React.FC<ARSceneProps> = ({ modelName, modelFileName }) => {
  const [text, setText] = useState("Initializing AR...");

  const onInitialized = (state: any) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText(`${modelName} AR Initialized`);
    } else {
      setText("Tracking Unavailable");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <Viro3DObject
        source={
          modelSources[modelFileName] || modelSources["default_scene.glb"]
        }
        position={[0, 0, -0.5]}
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, -90, 0]}
        type="GLB"
      />
    </ViroARScene>
  );
};

interface ARSceneScreenProps {
  route: {
    params: { modelName: string; modelFileName: string; description: string };
  };
}

const ARSceneScreenNew: React.FC<ARSceneScreenProps> = ({ route }) => {
  const { darkMode } = useTheme(); // Get global dark mode state
  const { modelName, modelFileName, description } = route.params;
  const navigation = useNavigation();
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [panelOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isPanelVisible) {
      // Fade in the panel content
      Animated.timing(panelOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out the panel content
      Animated.timing(panelOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isPanelVisible, panelOpacity]);

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
            <ARSceneNew modelName={modelName} modelFileName={modelFileName} />
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
            style={[
              styles.backText,
              { color: darkMode ? "white" : "black" }, // Adjust text color dynamically
            ]}
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
          <Text style={styles.infoButtonText}>ℹ️</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Info Panel */}

      <Modal visible={isPanelVisible} transparent animationType="none">
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { opacity: panelOpacity },
              { backgroundColor: darkMode ? "#222222" : "#f5f5f5" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: darkMode ? "white" : "black" },
              ]}
            >
              {modelName}
            </Text>
            <View
              style={{
                borderBottomColor: darkMode ? "white" : "black",
                borderBottomWidth: 2,
              }}
            />
            <Text
              style={[
                styles.modalDescription,
                { color: darkMode ? "white" : "black" },
              ]}
            >
              {description}
            </Text>
            <TouchableOpacity
              onPress={() => setPanelVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ARSceneScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
  },
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
  backText: { color: "white", fontSize: 18 },
  headerTitle: { flex: 1, color: "white", fontSize: 20, textAlign: "center" },
  infoButton: {
    padding: 8,
  },
  infoButtonText: { fontSize: 24, color: "white" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modaldarkContent: {},
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: "black",
    marginTop: 5,
  },
  modalButton: {
    backgroundColor: "#5780ef",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16 },
});
