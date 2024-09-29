import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Ensure this is correct

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const subjects: Array<keyof typeof models> = ['General Science', 'Chemistry', 'Biology', 'Physics'];

const models = {
  'General Science': [{ name: 'Earth', id: 1 }, { name: 'Solar System', id: 2 }],
  Chemistry: [{ name: 'Water Molecule', id: 3 }, { name: 'Periodic Table', id: 4 }],
  Biology: [{ name: 'Human Heart', id: 5 }, { name: 'Cell Structure', id: 6 }],
  Physics: [{ name: 'Gravity', id: 7 }, { name: 'Electric Field', id: 8 }],
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof models>('General Science');

  // Handle navigation to ARSceneScreen with the modelName
  const handleModelPress = (modelName: string) => {
    navigation.navigate('ARSceneScreen', { modelName });
  };  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <StatusBar
        translucent
        backgroundColor="#fff"
        barStyle="dark-content"  // Use 'dark-content' if your background is light
      />
      <View style={styles.header}>
        <Text style={styles.title}>ARia</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Image source={require('../assets/icons/settings.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Navigation Pane */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectNav}>
        {subjects.map(subject => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.subjectButton,
              selectedSubject === subject && styles.subjectButtonSelected,
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubject === subject && styles.subjectButtonTextSelected,
              ]}
            >
              {subject}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Vertical Scroll List of Models */}
      <FlatList
        data={models[selectedSubject]}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.modelItem} onPress={() => handleModelPress(item.name)}>
            <Text style={styles.modelText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.modelList}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  subjectNav: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
    height: 40
  },
  subjectButtonSelected: {
    backgroundColor: '#5780ef',
  },
  subjectButtonText: {
    fontSize: 16,
    color: '#333',
  },
  subjectButtonTextSelected: {
    color: '#fff',
  },
  modelList: {
    paddingHorizontal: 16,
  },
  modelItem: {
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  modelText: {
    fontSize: 18,
    color: '#000',
  },
});
