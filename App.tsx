import React from 'react';
import 'react-native-gesture-handler'; // Ensure this is at the top
import { enableScreens } from 'react-native-screens';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from './screens/HomeScreen';
import ARSceneScreen from './screens/ARSceneScreen';
import { createStackNavigator } from "@react-navigation/stack";

enableScreens(); // Enable react-native-screens

const Stack = createStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ARSceneScreen" component={ARSceneScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;
