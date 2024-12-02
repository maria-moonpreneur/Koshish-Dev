import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Animated, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const AnimatedIcon = ({ name, size, isActive, label, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1.2 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.7)).current;
  const backgroundAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1.2 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#05BEC6'],
  });

  return (
    <TouchableOpacity activeOpacity={1} style={styles.tabContainer} onPress={onPress}>
      <Animated.View style={[styles.iconTextContainer, { backgroundColor }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
          <FontAwesome name={name} size={size} color={isActive ? "#fff" : "#000"} />
        </Animated.View>
        <Text style={[styles.label, { color: isActive ? "#fff" : "#000" }]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Feedback:', userId);
    }, [userId])
  );

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const isActive = (screen) => route.name === screen;

  const handleSubmit = async () => {
    if (!name || !email || !mobileNumber || !feedback) {
      Alert.alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Contact', mobileNumber);
      formData.append('Subject', 'App User Feedback');
      formData.append('Message', feedback);

      const response = await fetch("https://koshishcdc.com/api/Account/ContactUs", {
        method: "POST",
        headers: {
          "accept": "*/*",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Feedback Submitted", "Thank you for your feedback!");
        setName('');
        setEmail('');
        setMobileNumber('');
        setFeedback('');
      } else {
        Alert.alert("Submission Failed", "Please try again later.");
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      Alert.alert("Error", "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>We Value Your Feedback!</Text>

            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#aaa"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
            </View>

            <TextInput
              style={[styles.inputContainer, styles.feedbackInput]}
              placeholder="Share your feedback with us"
              placeholderTextColor="#aaa"
              value={feedback}
              onChangeText={setFeedback}
              multiline={true}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomNavigation}>
        <AnimatedIcon
          name="comments"
          size={width * 0.08}
          isActive={isActive('Feedback')}
          label="Feedback"
          onPress={() => navigation.navigate('Feedback', { userId })}
        />
        <AnimatedIcon
          name="phone"
          size={width * 0.08}
          isActive={isActive('Contact')}
          label="Contact"
          onPress={() => navigation.navigate('Contact', { userId })}
        />
        <AnimatedIcon
          name="home"
          size={width * 0.08}
          isActive={isActive('Dashboard')}
          label="Home"
          onPress={() => navigation.navigate('Dashboard', { userId })}
        />
        <AnimatedIcon
          name="user-circle"
          size={width * 0.08}
          isActive={isActive('UserData')}
          label="Profile"
          onPress={() => navigation.navigate('UserData', { userId })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99E7E1',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    padding: 20,
    marginVertical: height * 0.05,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: width * 0.07,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: width * 0.045,
    color: '#333',
  },
  feedbackInput: {
    height: height * 0.15,
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  submitButton: {
    backgroundColor: '#05BEC6',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#05BEC6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontFamily: 'Inter_400Regular',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E9FEFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    width: '100%',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Feedback;
