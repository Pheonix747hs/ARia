import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

// This component represents the AR scene
const ARScene: React.FC<{ modelName: string }> = ({ modelName }) => {
  const [text, setText] = useState("Initializing AR...");

  // Handles AR tracking state updates
  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText(`${modelName} AR Initialized`);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("Tracking Unavailable");
    }
  }

  // Determines the model file to load based on the model name
  const getModelSource = () => {
    switch (modelName) {
      // case 'Earth':
      //   return require("./assets/earth.glb");
      // case 'Solar System':
      //   return require("./assets/solar_system.glb");
      // case 'Water Molecule':
      //   return require("./assets/water_molecule.glb");
      // case 'Periodic Table':
      //   return require("./assets/periodic_table.glb");
      // case 'Human Heart':
      //   return require("./assets/human_heart.glb");
      // case 'Cell Structure':
      //   return require("./assets/cell_structure.glb");
      // case 'Gravity':
      //   return require("./assets/gravity.glb");
      // case 'Electric Field':
      //   return require("./assets/electric_field.glb");
      default:
        return require("../assets/table_scene.glb"); // Default model
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Adding ambient light to the scene */}
      <ViroAmbientLight color="#ffffff" intensity={500} />
      {/* Display AR initialization or model name */}
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      {/* Render the 3D model based on the selected model name */}
      <Viro3DObject
        source={getModelSource()} // Dynamically select the model based on the name
        position={[0, -1, -1]}
        scale={[0.1, 0.1, 0.1]} // Adjust scale if necessary
        type="GLB"
      />
    </ViroARScene>
  );
};

// AR Scene Screen component
const ARSceneScreen: React.FC<{ route: { params: { modelName: string } } }> = ({
  route,
}) => {
  const { modelName } = route.params; // Get the modelName passed from the HomeScreen

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => <ARScene modelName={modelName} />,
      }}
      style={styles.f1}
    />
  );
};

export default ARSceneScreen;

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
