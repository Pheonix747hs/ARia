import React, { useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
  BackHandler,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useTheme } from "../context/ThemeContext";

interface ModalInfoPanelProps {
  visible: boolean;
  onDismiss: () => void;
  modelName: string;
  description: string | any;
}

const ModalInfoPanel: React.FC<ModalInfoPanelProps> = ({
  visible,
  onDismiss,
  modelName,
  description,
}) => {
  const { darkMode } = useTheme();
  const width = useWindowDimensions().width;

  // Handle hardware back button
  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        onDismiss();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalContainer} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: darkMode
                ? "rgba(29, 29, 29, 0.9)"
                : "rgba(255, 255, 255, 0.95)",
            },
          ]}
        >
          {/* Header */}
          <Text
            style={[styles.modalTitle, { color: darkMode ? "white" : "black" }]}
          >
            {modelName}
          </Text>
          <View
            style={{
              borderBottomColor: darkMode ? "white" : "black",
              borderBottomWidth: 2,
            }}
          />

          {/* Content Container */}
          <View style={styles.contentContainer}>
            <RenderHTML
              contentWidth={width}
              source={
                typeof description === "string"
                  ? { html: `${description}` }
                  : description
              }
              baseStyle={{
                ...styles.modalDescription,
                color: darkMode ? "white" : "black",
              }}
              tagsStyles={{ img: { height: 150 } }}
            />
          </View>

          {/* Footer with Dismiss Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onDismiss}
              style={[
                styles.modalButton,
                { backgroundColor: darkMode ? "#333" : "#5780ef" },
              ]}
            >
              <Text style={[styles.modalButtonText]}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalInfoPanel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingBottom: 10,
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90%", // Prevents full-screen stretching
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginTop: 0,
  },
  contentContainer: {
    width: "100%",
    minHeight: 300,
    maxHeight: "95%", // Limits height to prevent overflow
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
