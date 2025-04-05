import "react-native-gesture-handler"; // Ensure this is at the top
import { enableScreens } from "react-native-screens";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "./Data/types";
import SplashScreenNew from "./screens/SplashScreenNew";
import HomeScreenNew from "./screens/HomeScreenNew";
import ARSceneScreenNew from "./screens/ARSceneScreenNew";
import SettingsScreen from "./screens/SettingsScreen";
import ChatScreen from "./screens/ChatScreen";
import { ThemeProvider } from "./context/ThemeContext";

// Enable react-native-screens for performance
enableScreens();

// Create the typed Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreenNew">
          <Stack.Screen
            name="SplashScreenNew"
            component={SplashScreenNew}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreenNew"
            component={HomeScreenNew}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ARSceneScreenNew"
            component={ARSceneScreenNew}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
