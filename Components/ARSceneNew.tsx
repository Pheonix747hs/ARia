import React, { useState } from "react";
import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { StyleSheet } from "react-native";
import { modelSources } from "../Data/modelData";

interface ARSceneProps {
  modelName: string;
  modelFileName: string;
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
}

const ARSceneNew: React.FC<ARSceneProps> = ({
  modelName,
  modelFileName,
  scale,
  rotation,
  position,
}) => {
  const [statusText, setStatusText] = useState("Initializing AR...");

  const onInitialized = (state: any) => {
    switch (state) {
      case ViroTrackingStateConstants.TRACKING_NORMAL:
        setStatusText(`${modelName} is Ready`);
        break;
      case ViroTrackingStateConstants.TRACKING_UNAVAILABLE:
        setStatusText("Tracking Lost. Move your device.");
        break;
      default:
        setStatusText("Initializing AR...");
        break;
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Ambient Light for overall brightness */}
      <ViroAmbientLight color="#ffffff" intensity={1000} />

      {/* Spot Light to enhance the model */}
      <ViroSpotLight direction={[0, -1, 0]} intensity={6000} color="#ffffff" />

      {/* Status Text Display */}
      <ViroText
        text={statusText}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.5, -1]}
        style={styles.statusText}
      />

      {/* 3D Model */}
      <Viro3DObject
        source={
          modelSources[modelFileName] || modelSources["default_scene.glb"]
        }
        position={position}
        scale={scale}
        rotation={rotation}
        type="GLB"
        animation={{
          name: modelName === "Nuclear Fission" ? "Take 01" : "Scene",
          run: true,
          loop: true,
        }}
      />
    </ViroARScene>
  );
};

export default ARSceneNew;

const styles = StyleSheet.create({
  statusText: {
    fontSize: 28,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});
