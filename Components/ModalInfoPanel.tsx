import React, { useEffect, useState } from "react";
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
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
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
      <View
        style={[
          styles.modalContent,
          {
            backgroundColor: darkMode
              ? "rgba(29, 29, 29, 0.62)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: 16,
          },
        ]}
      >
        {/* Header (Stationary) */}
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
          <TouchableOpacity onPress={onDismiss} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  contentContainer: {
    width: "100%",
    minHeight: 600,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: "#5780ef",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: { color: "#fff", fontSize: 16 },
});
