import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

const SplashScreenNew = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace("HomeScreenNew"));
    }, 4000); // Adjust to match your video's duration
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/animation.mp4")} // Ensure the path is correct
        style={styles.video}
        resizeMode="cover" // Adjust to "contain" if needed
        muted={true} // Remove sound
        repeat={false} // Play once
        onEnd={() => navigation.dispatch(StackActions.replace("HomeScreenNew"))}
      />
    </View>
  );
};

export default SplashScreenNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Adjust if needed
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
