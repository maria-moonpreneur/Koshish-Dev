import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, ActivityIndicator } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const customToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successToast}>
      <Text style={styles.toastText}>{text1}</Text>
      <Text style={styles.toastSubtext}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
      <Text style={styles.toastSubtext}>{text2}</Text>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={styles.infoToast}>
      <Text style={styles.toastText}>{text1}</Text>
      <Text style={styles.toastSubtext}>{text2}</Text>
    </View>
  ),
};

const Complaint = ({ route, navigation }) => {
  const [complaint, setComplaint] = useState('');
  const [progress] = useState(new Animated.Value(route.params.progress || 0.9));
  const [sound, setSound] = useState(null);

  const {
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
    familyType,
  } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    const loadSound = async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3') // Replace with your actual sound file
      );
      setSound(loadedSound);
    };

    loadSound();

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
      toValue: 1,
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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const now = new Date();
    const years = now.getFullYear() - birthDate.getFullYear();
    const months = now.getMonth() - birthDate.getMonth();
    const days = now.getDate() - birthDate.getDate();

    let ageString = '';
    if (years > 0) {
      ageString += `${years} ${years > 1 ? 'years' : 'year'}`;
      if (months > 0) {
        ageString += ` ${months} ${months > 1 ? 'months' : 'month'}`;
      }
    } else if (months > 0) {
      ageString += `${months} ${months > 1 ? 'months' : 'month'}`;
    } else {
      ageString = `${days} ${days > 1 ? 'days' : 'day'}`;
    }

    return ageString;
  };

  const handleRegister = async () => {
    playSound(); // Play sound when "Register" button is pressed
    try {
      const userId = Math.floor(100000 + Math.random() * 900000);
      const formattedDOB = `${dateOfBirth.toISOString().split('T')[0]} 00:00:00.000`;
      const age = calculateAge(dateOfBirth);

      const formData = new FormData();
      formData.append('UserId', userId.toString());
      formData.append('EmployeeName', 'Koshish App');
      formData.append('Age', age);
      formData.append('ParentName', parentName);
      formData.append('EmailId', email);
      formData.append('Mobile', mobileNumber);
      formData.append('Addresss', address);
      formData.append('ChildName', childName);
      formData.append('ChildGender', gender);
      formData.append('ChildDOB', formattedDOB);
      formData.append('details.MotherTongue', motherTongue);
      formData.append('details.FathersFullName', fatherName);
      formData.append('details.FathersProfession', fatherProfession);
      formData.append('details.MothersFullName', motherName);
      formData.append('details.MothersProfession', motherProfession);
      formData.append('details.GeneralComplaint', complaint);
      formData.append('details.IsNuclearFamily', familyType === 'Nuclear Family');
      formData.append('details.IsJointFamily', familyType === 'Joint Family');
      formData.append('isActive', true);

      const response = await fetch('https://koshishcdc.com/api/User/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.status === 400 && data.errors) {
        const firstErrorKey = Object.keys(data.errors)[0];
        const firstErrorMessage = data.errors[firstErrorKey][0];
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: firstErrorMessage,
          position: 'bottom',
          bottomOffset: 50,
          visibilityTime: 4000,
        });
        return;
      }

      if (data.response?.result?.message === 'EmailId OR Mobile Number Already Exist') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Email or Mobile Number already exists. Please try again.',
          position: 'bottom',
          bottomOffset: 50,
          visibilityTime: 4000,
        });
        return;
      }

      if (data.response?.result?.message === 'User Created Successfully.') {
        const userID = data.response.result.id;
        console.log("User ID:", userID);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Registration successful',
          position: 'bottom',
          bottomOffset: 50,
          visibilityTime: 4000,
        });
        setComplaint('');
        navigation.navigate('Dashboard', {
          userId: userID,
        });
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again.',
        position: 'bottom',
        bottomOffset: 50,
        visibilityTime: 4000,
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
      </View>

      <Image source={require('../assets/Complaint.png')} style={styles.image} />

      <Text style={styles.title}>Do you have any complaints?</Text>

      <TextInput
        style={styles.textbox}
        placeholder="Enter your complaint here..."
        multiline={true}
        value={complaint}
        onChangeText={setComplaint}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Toast config={customToastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97E7E1',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
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
  title: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'contain',
    marginTop: 20,
  },
  textbox: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
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
  successToast: {
    backgroundColor: '#4BB543',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  errorToast: {
    backgroundColor: '#FF4B4B',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  infoToast: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  toastText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  toastSubtext: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Complaint;
