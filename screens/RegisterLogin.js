import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const RegisterLogin = ({ route, navigation }) => {
  const [isLogin, setIsLogin] = useState(route.params?.showLogin || false);
  const [loginMobileNumber, setLoginMobileNumber] = useState('');
  const [registrationMobileNumber, setRegistrationMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isOtpClickable, setIsOtpClickable] = useState(true);
  const [timer, setTimer] = useState(0);

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/button-click.mp3')
      );
      setSound(sound);
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
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsOtpClickable(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.resetFields) {
        setLoginMobileNumber('');
        setOtp('');
        setParentName('');
        setEmail('');
        setRegistrationMobileNumber('');
        setAddress('');
        setMessage('');
        setMessageType('');
        setIsOtpClickable(true);
        setTimer(0);
      }
    }, [route.params?.resetFields])
  );

  if (!fontsLoaded) {
    return null;
  }

  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const handleGenerateOtp = async () => {
    playSound();

    if (!validateMobileNumber(loginMobileNumber)) {
      setMessageType('error');
      setMessage('Invalid Mobile Number. Please enter a valid 10-digit mobile number.');
      return;
    }

    const formData = new FormData();
    formData.append('Mobile_Email', loginMobileNumber);

    try {
      const response = await fetch('https://koshishcdc.com/api/Account/SendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.statuscode === 200 && result.message !== "User doesn't exist. Register to continue") {
        setMessageType('success');
        setMessage('OTP Sent Successfully');
        setIsOtpClickable(false);
        setTimer(30);
      } else if (result.statuscode === 500 && result.message === "User doesn't exist. Register to continue") {
        setMessageType('error');
        setMessage("User doesn't exist. Please register to continue.");
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    playSound();

    if (!validateMobileNumber(loginMobileNumber)) {
      setMessageType('error');
      setMessage('Invalid Mobile Number. Please enter a valid 10-digit mobile number.');
      return;
    }

    const formData = new FormData();
    formData.append('MobileEmail', loginMobileNumber);
    formData.append('otp', otp);
    formData.append('IsWeb', 'false');

    try {
      const response = await fetch('https://koshishcdc.com/api/Account/VerifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'Ok' && response.status === 200) {
        navigation.navigate('Dashboard', {
          userId: result.userId,
        });
        setMessageType('success');
        setMessage('Login successful!');
      } else {
        setMessageType('error');
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleContinue = () => {
    playSound();

    if (!validateMobileNumber(registrationMobileNumber)) {
      setMessageType('error');
      setMessage('Invalid Mobile Number. Please enter a valid 10-digit mobile number.');
      return;
    }

    navigation.navigate('ChildName', {
      parentName,
      email,
      mobileNumber: registrationMobileNumber,
      address,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image source={require('../assets/LoginBoy.png')} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => { setIsLogin(false); playSound(); }}>
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsLogin(true); playSound(); }}>
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            {isLogin ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="MOBILE NUMBER*"
                  value={loginMobileNumber}
                  onChangeText={setLoginMobileNumber}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.generateOtpButton}
                  onPress={handleGenerateOtp}
                  disabled={!isOtpClickable}
                >
                  <Text style={styles.generateOtpText}>
                    {isOtpClickable
                      ? timer === 0
                        ? 'Generate OTP'
                        : 'Regenerate OTP'
                      : `Resend in ${timer}s`}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="ENTER OTP*"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                />
                {message ? (
                  <Text style={[styles.message, messageType === 'error' ? styles.errorText : styles.successText]}>
                    {message}
                  </Text>
                ) : null}
                <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOtp}>
                  <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="PARENT NAME*"
                  value={parentName}
                  onChangeText={setParentName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="EMAIL ID*"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="MOBILE NUMBER*"
                  value={registrationMobileNumber}
                  onChangeText={setRegistrationMobileNumber}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="ADDRESS"
                  value={address}
                  onChangeText={setAddress}
                />
                <View style={styles.messageAndButtonContainer}>
                  {message ? (
                    <Text style={[styles.message, messageType === 'error' ? styles.errorText : styles.successText]}>
                      {message}
                    </Text>
                  ) : null}
                  <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
                    <Text style={styles.primaryButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAFFFB',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    alignItems: 'center',
    zIndex: -1,
  },
  image: {
    width: width * 1.5,
    height: height * 0.6,
  },
  formContainer: {
    marginTop: height * 0.4,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },
  tabText: {
    fontSize: 18,
    fontFamily: 'LexendDeca_700Bold',
    color: '#888888',
  },
  activeTabText: {
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  form: {
    width: '100%',
    flex: 1,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    paddingVertical: 10,
    marginBottom: 20,
  },
  generateOtpButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  generateOtpText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  messageAndButtonContainer: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: '#000000',
  },
  errorText: {
    color: '#FF0000',
  },
  primaryButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});

export default RegisterLogin;
