import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Animated, Image, ActivityIndicator } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const Mother = ({ route, navigation }) => {
  const [motherName, setMotherName] = useState('');
  const [motherProfession, setMotherProfession] = useState('');
  const [progress] = useState(new Animated.Value(route.params.progress || 0.6));
  const [sound, setSound] = useState(null);

  const { parentName, email, mobileNumber, address, childName, gender, dateOfBirth, motherTongue, fatherName, fatherProfession } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    // Load sound on component mount
    const loadSound = async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3') // Replace with your actual sound file
      );
      setSound(loadedSound);
    };

    loadSound();

    return () => {
      // Unload sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const validateMotherName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateMotherProfession = (profession) => /^[A-Za-z\s]+$/.test(profession);

  const handleContinue = () => {
    playSound(); // Play sound on "Continue" button press

    if (!validateMotherName(motherName)) {
      Toast.show("Mother's name should contain only letters and spaces.", Toast.LONG);
      return;
    }

    if (!validateMotherProfession(motherProfession)) {
      Toast.show("Mother's profession should contain only letters and spaces.", Toast.LONG);
      return;
    }

    navigation.navigate('Family', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender,
      dateOfBirth,
      motherTongue,
      fatherName,
      fatherProfession,
      motherName,
      motherProfession,
    });
  };

  const handleSkip = () => {
    playSound(); // Play sound on "Skip" button press

    navigation.navigate('Family', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender,
      dateOfBirth,
      motherTongue,
      fatherName,
      fatherProfession,
      motherName: '',
      motherProfession: '',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
            </View>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/Mother.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Enter Mother's Details</Text>
          <Text style={styles.subtitle}>
            We would love to know about the child's parents to better personalize your experience.
          </Text>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mother's Name"
              value={motherName}
              onChangeText={setMotherName}
            />
            <TextInput
              style={styles.input}
              placeholder="Mother's Profession"
              value={motherProfession}
              onChangeText={setMotherProfession}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#97E7E1',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'LexendDeca_700Bold',
    color: 'black',
    marginLeft: 10,
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default Mother;
