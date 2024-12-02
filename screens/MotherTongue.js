import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, FlatList, ActivityIndicator } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const languages = [
    { label: "Assamese", value: "Assamese" },
    { label: "Bengali", value: "Bengali" },
    { label: "Bodo", value: "Bodo" },
    { label: "Dogri", value: "Dogri" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Hindi", value: "Hindi" },
    { label: "Kannada", value: "Kannada" },
    { label: "Kashmiri", value: "Kashmiri" },
    { label: "Konkani", value: "Konkani" },
    { label: "Maithili", value: "Maithili" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Meitei", value: "Meitei" },
    { label: "Marathi", value: "Marathi" },
    { label: "Nepali", value: "Nepali" },
    { label: "Oriya", value: "Oriya" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Sanskrit", value: "Sanskrit" },
    { label: "Santhali", value: "Santhali" },
    { label: "Sindhi", value: "Sindhi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Telugu", value: "Telugu" },
    { label: "Urdu", value: "Urdu" },
    { label: "English", value: "English" },
    { label: "Other", value: "Other" },
];

const MotherTongueSelection = ({ route, navigation }) => {
  const [motherTongue, setMotherTongue] = useState('');
  const [progress] = useState(new Animated.Value(route.params.progress || 0));

  const { parentName, email, mobileNumber, address, childName, gender, dateOfBirth } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const [sound, setSound] = useState();

  useEffect(() => {
    // Load sound on component mount
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3') // Replace with your sound file
      );
      setSound(sound);
    };

    loadSound();

    // Cleanup sound on component unmount
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.4,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleContinue = () => {
    if (!motherTongue) {
      Toast.show('Please select your mother tongue before continuing.', Toast.LONG);
      return;
    }

    playSound();

    navigation.navigate('Father', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender,
      dateOfBirth,
      motherTongue,
    });
  };

  const handleSkip = () => {
    playSound();

    navigation.navigate('Father', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender,
      dateOfBirth,
      motherTongue: '',
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.languageOption, motherTongue === item.value && styles.selectedOption]}
      onPress={() => {
        setMotherTongue(item.value);
        playSound();
      }}
    >
      <Text style={styles.languageLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Select Your Mother Tongue</Text>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        numColumns={2}
        contentContainerStyle={styles.languageList}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#97E7E1',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 50,
  },
  progressBarContainer: {
    flex: 1,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'LexendDeca_700Bold',
    color: 'black',
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  languageList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOption: {
    width: width * 0.4,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedOption: {
    borderColor: 'black',
  },
  languageLabel: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default MotherTongueSelection;
