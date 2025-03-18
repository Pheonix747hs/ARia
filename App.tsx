import "react-native-gesture-handler"; // Ensure this is at the top
import { enableScreens } from "react-native-screens";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "./Data/types"; // Import the param list
import SplashScreenNew from "./screens/SplashScreenNew";
import HomeScreenNew from "./screens/HomeScreenNew";
import ARSceneScreenNew from "./screens/ARSceneScreenNew";

// Enable react-native-screens for performance
enableScreens();

// Create the typed Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreenNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreenNew}
          options={{ headerShown: false }}
        />
        {/* Use the correct typing for the ARSceneScreen that expects params */}
        <Stack.Screen
          name="ARSceneScreen"
          component={ARSceneScreenNew as React.FC<any>}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
