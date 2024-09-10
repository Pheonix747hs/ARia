
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
  ViroCamera
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import 'react-native-gesture-handler'; // Ensure this is at the top
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ARSceneScreen from './screens/ARSceneScreen';

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
    
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" intensity={500}/>
      

        <Viro3DObject
          source={require("./assets/table_scene.glb")}
          scale={[0.1, 0.1, 0.1]}
          position={[0, -0.5, -0.4]}
          type="GLB"
          rotation={[0, 90, 0]}
        />
        <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

    </ViroARScene>


  );
};

export default App;
