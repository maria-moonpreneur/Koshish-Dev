import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const GetStarted = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const [sound, setSound] = useState();

  useEffect(() => {
    // Load the sound on component mount
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3') // Replace with your actual sound file
      );
      setSound(sound);
    };

    loadSound();

    // Unload the sound on component unmount
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

  const handlePrimaryButtonPress = () => {
    playSound();
    navigation.navigate('RegisterLogin');
  };

  const handleSecondaryButtonPress = () => {
    playSound();
    navigation.navigate('RegisterLogin');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/kids.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/shadow.png')}
          style={styles.shadowImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.description}>
          Achieving milestones on time is very important for every child's development. 
          We are here to help you parents to find out if there is any speech delay or 
          autism red flags found in your child. You can do this at the click of a button 
          sitting at home. Also if any delay is found we will be happy to help with parent 
          counseling. Early Intervention will help to achieve the missed milestones.
        </Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handlePrimaryButtonPress}>
        <Text style={styles.primaryButtonText}>OK, let's do it!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleSecondaryButtonPress}>
        <Text style={styles.secondaryButtonText}>Maybe later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#DAFFFB',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: -10,
    width: '100%',
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
  },
  shadowImage: {
    width: width * 0.8,
    height: height * 0.2,
    position: 'absolute',
    bottom: 0,
    opacity: 0.6,
  },
  textContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.06,
    fontFamily: 'LexendDeca_700Bold',
    color: '#000000',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.04,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#000000',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.25,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: width * 0.045,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
    fontSize: width * 0.045,
  },
});

export default GetStarted;
