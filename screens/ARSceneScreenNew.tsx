








// import {
//   ViroARScene,
//   ViroARSceneNavigator,
//   ViroText,
//   ViroTrackingReason,
//   ViroTrackingStateConstants,
//   Viro3DObject,
//   ViroAmbientLight,
// } from "@reactvision/react-viro";
// import React, { useState } from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const ARSceneNew: React.FC<{ modelName: string }> = ({ modelName }) => {
//   const [text, setText] = useState("Initializing AR...");

//   function onInitialized(state: any, reason: ViroTrackingReason) {
//     console.log("onInitialized", state, reason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText(`${modelName} AR Initialized`);
//     } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//       setText("Tracking Unavailable");
//     }
//   }

//   const getModelSource = () => {
//     return require(`../assets/heart.glb`); // Default model
//   };

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroAmbientLight color="#ffffff" intensity={500} />
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//       <Viro3DObject
//         source={getModelSource()}
//         position={[0, 0, -0.02]}
//         scale={[0.1, 0.1, 0.1]}
//         type="GLB"
//       />
//     </ViroARScene>
//   );
// };

// const ARSceneScreenNew: React.FC<{ route: { params: { modelName: string } } }> = ({ route }) => {
//   const { modelName } = route.params;
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.backText}>{"< Back"}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>{modelName}</Text>
//       </View>
//       <ViroARSceneNavigator
//         autofocus={true}
//         initialScene={{ scene: () => <ARSceneNew modelName={modelName} /> }}
//         style={styles.f1}
//       />
//     </View>
//   );
// };

// export default ARSceneScreenNew;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "black",
//   },
//   backText: {
//     color: "white",
//     fontSize: 18,
//   },
//   title: {
//     flex: 1,
//     color: "white",
//     fontSize: 20,
//     textAlign: "center",
//   },
//   f1: { flex: 1 },
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center",
//   },
// });



import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ARSceneProps {
  modelName: string;
  modelFileName: string;
}

// Create a static mapping of model file keys to the required assets.
const modelSources: Record<string, any> = {
  "molecule_structure.glb": require("../assets/brain.glb"),
  "oxy-atom.glb": require("../assets/oxy-atom.glb"),
  "diamond.glb": require("../assets/diamond.glb"),
  "heart.glb": require("../assets/heart.glb"),
  "brain.glb": require("../assets/brain.glb"),
  "eye.glb": require("../assets/eye.glb"),
  "default_scene.glb": require("../assets/brain.glb"), 
};

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
        source={modelSources[modelFileName] || modelSources["default_scene.glb"]}
        position={[0, 0, -0.1]}
        scale={[0.1, 0.1, 0.1]}
        type="GLB"
      />
    </ViroARScene>
  );
};

interface ARSceneScreenProps {
  route: { params: { modelName: string; modelFileName: string } };
}

const ARSceneScreenNew: React.FC<ARSceneScreenProps> = ({ route }) => {
  const { modelName, modelFileName } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{modelName}</Text>
      </View>
      <ViroARSceneNavigator
        autofocus
        initialScene={{
          scene: () => (
            <ARSceneNew modelName={modelName} modelFileName={modelFileName} />
          ),
        }}
        style={styles.f1}
      />
    </View>
  );
};

export default ARSceneScreenNew;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black",
  },
  backText: { color: "white", fontSize: 18 },
  title: { flex: 1, color: "white", fontSize: 20, textAlign: "center" },
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
  },
});
