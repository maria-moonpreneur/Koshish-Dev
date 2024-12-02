import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const Launch = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    DMSans_500Medium,
  });

  const [sound, setSound] = useState();

  useEffect(() => {
    // Load sound on component mount
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3') // Replace with your actual sound file
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

  const handleProceed = () => {
    playSound();
    navigation.navigate('GetStarted');
  };

  if (!fontsLoaded) {
    return null; // Optionally add a loader here
  }

  return (
    <ImageBackground source={require('../assets/Shape.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.roundedRectangle} />
        <View style={styles.imageContainer}>
          <Image source={require('../assets/shadow.png')} style={styles.shadowImage} />
          <Image source={require('../assets/OriginalBoy1.png')} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>KOSHISH</Text>
          <Text style={styles.subtitle}>Your child's development partner</Text>
        </View>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedRectangle: {
    position: 'absolute',
    width: width * 0.85,
    height: height * 0.31,
    backgroundColor: '#DAFFFB',
    opacity: 0.7,
    borderRadius: 70,
    top: height * 0.40,
    transform: [{ translateY: -(height * 0.15) }],
  },
  imageContainer: {
    width: width,
    position: 'absolute',
    top: height * 0.32,
    transform: [{ translateY: -(height * 0.2) }],
    alignItems: 'center',
  },
  image: {
    width: width * 0.70,
    height: height * 0.52,
  },
  shadowImage: {
    width: width * 0.85,
    height: height * 0.3,
    position: 'absolute',
    opacity: 0.6,
    bottom: 10,
  },
  title: {
    fontSize: width * 0.12,
    fontFamily: 'LexendDeca_700Bold',
    color: '#3C351D',
  },
  subtitle: {
    fontSize: width * 0.05,
    color: '#3C351D',
    fontFamily: 'Inter_400Regular',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: height * 0.6,
  },
  proceedButton: {
    marginTop: 60,
    backgroundColor: '#3c351d',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 15,
  },
  proceedButtonText: {
    color: '#fff',
    fontFamily: 'DMSans_500Medium',
    fontSize: width * 0.05,
  },
});

export default Launch;
