import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroSpotLight,
  ViroAnimations,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

// Register fade animations
ViroAnimations.registerAnimations({
  fadeIn: { properties: { opacity: 1 }, duration: 1000 },
  fadeOut: { properties: { opacity: 0 }, duration: 1000 },
});

interface ARSceneProps {
  showFirstObject: boolean;
}

const ARSceneScreen: React.FC = () => {
  // This state determines which model is visible
  const [showFirstObject, setShowFirstObject] = useState<boolean>(true);

  const toggleModels = () => {
    setShowFirstObject((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{
          // Pass the current state to ARScene as a prop
          scene: () => <ARScene showFirstObject={showFirstObject} />,
        }}
        autofocus={true}
        style={styles.f1}
      />
      <TouchableOpacity style={styles.button} onPress={toggleModels}>
        <Text style={styles.buttonText}>Toggle Model</Text>
      </TouchableOpacity>
    </View>
  );
};

const ARScene: React.FC<ARSceneProps> = ({ showFirstObject }) => {
  const [text, setText] = useState<string>("Initializing AR...");

  function onInitialized(state: number, reason: ViroTrackingReason): void {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText(`${modelName} AR Initialized`);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking if needed
    }
  }

  // (Optional) Create tracking targets if you're using image markers.
  ViroARTrackingTargets.createTargets({
    pug2D_img: {
      source: require("../assets/atom.jpg"),
      orientation: "Up",
      physicalWidth: 0.2, // real world width in meters
      type: "Image",
    },
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" intensity={100} />
      <ViroSpotLight
        intensity={100}
        direction={[0, -0.5, -1.2]}
        color="#1f1f1f"
      />

      {/* First 3D Object */}
      <Viro3DObject
        source={require("../assets/untitled.glb")}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        type="GLB"
        rotation={[0, 0, 0]}
        animation={{
          name: "All",
          run: true,
        }}
      />

      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.2, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default ARSceneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  f1: {
    flex: 1,
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  // Button positioned in the bottom left
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
