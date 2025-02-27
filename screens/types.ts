// types.ts

export type RootStackParamList = {
  HomeScreen: undefined;
  ARSceneScreen: { modelName: string,modelFileName: String };  // Add this line for ARSceneScreen
  SettingsScreen: undefined;  // Add this line for SettingsScreen
  SplashScreen: undefined;
};
