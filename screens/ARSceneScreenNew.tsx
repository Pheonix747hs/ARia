import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Text,
  Image,
} from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Data/types";
import { useTheme } from "../context/ThemeContext";
import ModalInfoPanel from "../Components/ModalInfoPanel";
import ARSceneNew from "../Components/ARSceneNew";
import { StackNavigationProp } from "@react-navigation/stack";

const backIcon = require("../assets/icons/back2.png");
const infoIcon = require("../assets/icons/information.png");

type ARSceneScreenRouteProp = RouteProp<RootStackParamList, "ARSceneScreenNew">;
type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "ARSceneScreenNew"
>;

interface ARSceneScreenProps {
  route: ARSceneScreenRouteProp;
}

const ARSceneScreenNew: React.FC<ARSceneScreenProps> = ({ route }) => {
  const { modelName, modelFileName, description, scale, rotation, position } =
    route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const { darkMode } = useTheme();

  // Android back button
  useEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: darkMode ? "#1D1D1D" : "#F5F5F5" },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Image
            source={backIcon}
            style={[styles.icon, { tintColor: darkMode ? "white" : "black" }]}
          />
        </TouchableOpacity>

        <Text style={[styles.title, { color: darkMode ? "white" : "black" }]}>
          {modelName}
        </Text>

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.iconButton}
        >
          <Image
            source={infoIcon}
            style={[styles.icon, { tintColor: darkMode ? "white" : "black" }]}
          />
        </TouchableOpacity>
      </View>

      {/* AR Scene */}
      <ViroARSceneNavigator
        autofocus={true}
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
      />

      {/* Chat Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.navigate("ChatScreen", { modelName: modelName })
        }
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      {/* Info Modal */}
      <ModalInfoPanel
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        modelName={modelName}
        description={description}
      />
    </View>
  );
};

export default ARSceneScreenNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 30,
    zIndex: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5780ef",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
