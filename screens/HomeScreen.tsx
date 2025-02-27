import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof models>('General Science');

  // Handle navigation to ARSceneScreen with the modelName
  const handleModelPress = (modelName: string) => {
    navigation.navigate('ARSceneScreen', { modelName });
  };  

  return (
    <View>
      <Text style={styles.textstyle}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textstyle: {
    color: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
