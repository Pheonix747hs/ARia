// import {
//   ViroARScene,
//   ViroARSceneNavigator,
//   ViroText,
//   ViroTrackingStateConstants,
//   Viro3DObject,
//   ViroAmbientLight,
// } from "@reactvision/react-viro";
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   SafeAreaView,
//   Modal,
//   Animated,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { modelSources } from "../Data/modelData";

// interface ARSceneProps {
//   modelName: string;
//   modelFileName: string;
// }

// const ARSceneNew: React.FC<ARSceneProps> = ({ modelName, modelFileName }) => {
//   const [text, setText] = useState("Initializing AR...");

//   const onInitialized = (state: any) => {
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText(`${modelName} AR Initialized`);
//     } else {
//       setText("Tracking Unavailable");
//     }
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
//         source={
//           modelSources[modelFileName] || modelSources["default_scene.glb"]
//         }
//         position={[0, 0, 0]}
//         scale={[0.5, 0.5, 0.5]}
//         type="GLB"
//       />
//     </ViroARScene>
//   );
// };

// interface ARSceneScreenProps {
//   route: {
//     params: { modelName: string; modelFileName: string; description: string };
//   };
// }

// const ARSceneScreenNew: React.FC<ARSceneScreenProps> = ({ route }) => {
//   const { modelName, modelFileName, description } = route.params;
//   const navigation = useNavigation();
//   const [isPanelVisible, setPanelVisible] = useState(false);
//   const [panelOpacity] = useState(new Animated.Value(0));

//   useEffect(() => {
//     if (isPanelVisible) {
//       // Animate panel content opacity from 0 to 1
//       Animated.timing(panelOpacity, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       // Animate panel content opacity from 1 to 0
//       Animated.timing(panelOpacity, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isPanelVisible, panelOpacity]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backText}>{"< Back"}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>{modelName}</Text>
//           <TouchableOpacity
//             onPress={() => setPanelVisible(true)}
//             style={styles.infoButton}
//           >
//             <Text style={styles.infoButtonText}>ℹ️</Text>
//           </TouchableOpacity>
//         </View>
//         <ViroARSceneNavigator
//           autofocus
//           initialScene={{
//             scene: () => (
//               <ARSceneNew modelName={modelName} modelFileName={modelFileName} />
//             ),
//           }}
//           style={styles.f1}
//         />

//         {/* Modal Info Panel */}
//         <Modal visible={isPanelVisible} transparent animationType="fade">
//           <View style={styles.modalContainer}>
//             <Animated.View
//               style={[styles.modalContent, { opacity: panelOpacity }]}
//             >
//               <Text style={styles.modalTitle}>{modelName}</Text>
//               <Text style={styles.modalDescription}>{description}</Text>
//               <TouchableOpacity
//                 onPress={() => setPanelVisible(false)}
//                 style={styles.modalButton}
//               >
//                 <Text style={styles.modalButtonText}>Dismiss</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ARSceneScreenNew;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 12,
//     backgroundColor: "rgba(0, 0, 0, 0)",
//     paddingTop: Platform.OS === "android" ? 35 : 0,
//   },
//   backText: { color: "black", fontSize: 18 },
//   title: { flex: 1, color: "black", fontSize: 20, textAlign: "center" },
//   f1: { flex: 1 },
//   helloWorldTextStyle: {
//     fontSize: 30,
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   infoButton: { padding: 8 },
//   infoButtonText: { fontSize: 24, color: "white" },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.6)", // Black overlay appears instantly
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "black",
//   },
//   modalDescription: { fontSize: 16, marginBottom: 20, color: "black" },
//   modalButton: {
//     backgroundColor: "#5780ef",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   modalButtonText: { color: "#fff", fontSize: 16 },
// });
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
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
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
      <View style={styles.absoluteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{modelName}</Text>
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
            style={[styles.modalContent, { opacity: panelOpacity }]}
          >
            <Text style={styles.modalTitle}>{modelName}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  backText: { color: "white", fontSize: 18 },
  headerTitle: { flex: 1, color: "white", fontSize: 20, textAlign: "center" },
  infoButton: { padding: 8 },
  infoButtonText: { fontSize: 24, color: "white" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  modalDescription: { fontSize: 16, marginBottom: 20, color: "black" },
  modalButton: {
    backgroundColor: "#5780ef",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16 },
});
