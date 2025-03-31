// types.ts

export type RootStackParamList = {
  HomeScreen: undefined;
  ARSceneScreen: {
    modelName: string;
    modelFileName: string;
    description: string;
    scale: [number, number, number];
    rotation: [number, number, number];
    position: [number, number, number];
  };
  SettingsScreen: undefined;
  SplashScreen: undefined;
  ChatScreen: { modelName: string };
};
