import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const DateOfBirth = ({ route, navigation }) => {
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [progress] = useState(new Animated.Value(route.params.progress || 0.2));
  const [sound, setSound] = useState(null);

  const { parentName, email, mobileNumber, address, childName, gender } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    // Load sound on component mount
    const loadSound = async () => {
      try {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          require('../assets/button-click.mp3') // Replace with your actual sound file
        );
        setSound(loadedSound);
      } catch (error) {
        console.warn("Failed to load sound", error);
      }
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
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.warn("Failed to play sound", error);
    }
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.3,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleConfirm = (selectedDate) => {
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      Toast.show('The birth date cannot be in the future.', Toast.LONG);
      setDatePickerVisibility(false);
      return;
    }
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    playSound(); // Play sound when date picker is opened
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleContinue = () => {
    if (!date) {
      Toast.show('Please select the birth date before continuing.', Toast.LONG);
      return;
    }

    const currentDate = new Date();
    if (date > currentDate) {
      Toast.show('The birth date cannot be in the future.', Toast.LONG);
      return;
    }

    playSound(); // Play sound on "Continue" button press
    navigation.navigate('MotherTongueSelection', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender: gender === 'boy' ? 'Male' : 'Female',
      dateOfBirth: date,
    });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>
      <Image source={require('../assets/BirthDate.png')} style={styles.birthdayImage} resizeMode="contain" />
      <Text style={styles.title}>When was {childName} born?</Text>
      <Text style={styles.subtitle}>
        We need {childName}'s birth date in order to ask the right questions according to their age group.
      </Text>

      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {date ? date.toDateString() : 'Click here to select date'}
        </Text>
        <Image source={require('../assets/calendar-icon.png')} style={styles.calendarIcon} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(2000, 0, 1)}
        maximumDate={new Date()}
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
  progressBarContainer: {
    width: '80%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 50,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  birthdayImage: {
    width: width * 0.7,
    height: height * 0.5,
  },
  title: {
    fontSize: 25,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  dateText: {
    flex: 1,
    color: '#333',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default DateOfBirth;
