import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import { GEMINI_API_KEY } from "@env";
import { RootStackParamList } from "../Data/types";
import { Colors } from "../Data/Colors";

// Import the back button icon
const backIcon = require("../assets/icons/back2.png");

// Define navigation types
type ChatScreenRouteProp = RouteProp<RootStackParamList, "ChatScreen">;
type NavigationProps = StackNavigationProp<RootStackParamList, "ChatScreen">;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<ChatScreenRouteProp>();
  const { darkMode } = useTheme();
  const themeColors = darkMode ? Colors.dark : Colors.light;
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract only modelName from route params, with a default value
  const { modelName = "Chat AI" } = route.params || {};

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        }
      );
      const data = await response.json();
      const botMessage = {
        text:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't understand.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode && { backgroundColor: themeColors.background },
      ]}
    >
      {/* Header with back button and model name */}
      <View
        style={[
          styles.header,
          darkMode && {
            backgroundColor: themeColors.header,
            borderBottomColor: themeColors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.backButton}
        >
          <Image
            source={backIcon}
            style={[
              styles.backIcon,
              darkMode && { tintColor: themeColors.primary },
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            darkMode && { color: themeColors.primary },
          ]}
        >
          {modelName}
        </Text>
      </View>

      {/* Chat log [Dumped after every refresh] */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user"
                ? [
                    styles.userMessage,
                    { backgroundColor: themeColors.darkprimary },
                  ]
                : [styles.botMessage, { backgroundColor: themeColors.border }],
              {},
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === "user"
                  ? [darkMode && { color: themeColors.text }]
                  : [darkMode && { color: themeColors.inputBackground }],
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Loading indicator while waiting for API response */}
      {loading && (
        <View
          style={[
            styles.loadingContainer,
            { backgroundColor: themeColors.placeholder },
          ]}
        >
          <ActivityIndicator size="large" color="#5780ef" />
        </View>
      )}

      {/* Keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.inputContainer, { backgroundColor: themeColors.header }]}
      >
        <TextInput
          style={[
            styles.input,
            darkMode && styles.darkInput,
            { color: darkMode ? "#fff" : "#000" },
            { borderColor: themeColors.border, borderWidth: 1 },
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={darkMode ? "#aaa" : "#666"}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: themeColors.primary }]}
          onPress={sendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
  },
  darkHeader: { backgroundColor: "#333", borderBottomColor: "#444" },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 5,
  },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  message: { padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: "80%" },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(214,207,225,1)",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(214,207,225,1)",
  },
  messageText: { fontWeight: "400" },
  darkText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  input: { flex: 1, padding: 10, backgroundColor: "#fff", borderRadius: 20 },
  darkInput: { backgroundColor: "#444" },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default ChatScreen;
