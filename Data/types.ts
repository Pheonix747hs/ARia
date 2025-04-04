// types.ts

export type RootStackParamList = {
  HomeScreenNew: undefined;
  ARSceneScreenNew: {
    modelName: string;
    modelFileName: string;
    description: string;
    scale: [number, number, number];
    rotation: [number, number, number];
    position: [number, number, number];
  };
  SettingsScreen: undefined;
  SplashScreenNew: undefined;
  ChatScreen: { modelName?: string };
};
