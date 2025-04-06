import React, { useEffect, useState } from "react";
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
import Markdown from "react-native-markdown-display";
import TypewriterText from "../Components/TypewriterText";

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
  const backIcon = require("../assets/icons/back2.png");

  // Extract only modelName from route params, with a default value
  const { modelName = "AI Chat" } = route.params || {};

  // Set initial message
  useEffect(() => {
    setMessages([
      { text: "Hi there! How can i help you today?", sender: "bot" },
    ]);
  }, []);

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
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      input +
                      "  . Unless ive said to give me a long explaination before this line keep the explaination small upto 800 words ",
                  },
                ],
              },
            ],
          }),
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
          {
            backgroundColor: themeColors.header,
            borderBottomColor: themeColors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreenNew")}
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

      {/* Chat log */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              { borderWidth: 1, borderColor: themeColors.border },
              item.sender === "user"
                ? [
                    styles.userMessage,
                    { backgroundColor: themeColors.usermessage },
                  ]
                : [
                    styles.botMessage,
                    { backgroundColor: themeColors.botmessage },
                  ],
            ]}
          >
            {item.sender === "bot" ? (
              // Use the custom typewriter effect for bot messages
              <TypewriterText text={item.text} style={{ color: "black" }} />
            ) : (
              <Markdown
                style={{
                  body: {
                    color: "black",
                  },
                }}
              >
                {item.text}
              </Markdown>
            )}
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
          placeholder=" Type a message..."
          placeholderTextColor={darkMode ? "#aaa" : "#666"}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: themeColors.primary }]}
          onPress={sendMessage}
        >
          <Text style={[styles.sendButtonText, { color: "black" }]}>Send</Text>
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
  message: {
    paddingHorizontal: 8,
    paddingVertical: -9,
    marginVertical: 4,
    borderRadius: 20,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(214,207,225,1)",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(214,207,225,1)",
  },
  darkText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 5,
  },
  darkInput: { backgroundColor: "#444" },
  sendButton: {
    marginLeft: 10,
    padding: 14,
    borderRadius: 25,
    marginBottom: 2,
  },
  sendButtonText: { fontWeight: "bold" },
  loadingContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default ChatScreen;
