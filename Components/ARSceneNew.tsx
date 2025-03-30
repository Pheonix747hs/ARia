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
      <ViroSpotLight
        direction={[0, -120, 0]}
        intensity={5000}
        color="#ffffff"
      />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.4, -1]}
        style={styles.helloWorldTextStyle}
      />
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
  helloWorldTextStyle: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
  },
});
