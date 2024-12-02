import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView, BackHandler, Image, Alert, ActivityIndicator } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
    const data = await response.json();
    console.log(data);
    return data.response;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

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
    outputRange: ['transparent', '#05BEC6'], // Active background color
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

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const isActive = (screen) => route.name === screen;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in UserData:', userId);
    }, [userId])
  );

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Contact:', userId);

      const onBackPress = () => {
        navigation.navigate('Dashboard', { userId });
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [userId, navigation])
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData(userId);
      setUserData(data);
    };

    fetchData();
  }, [userId]);

  if (!fontsLoaded || !userData) {
    return <ActivityIndicator />;
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => navigation.navigate('RegisterLogin', {
            resetFields: true, // Pass the resetFields parameter
          })
        }
      ],
      { cancelable: false }
    );
  };

  const formatDateString = (dateString) => {
    // Handle full ISO string with time, like "2002-05-28T00:00:00"
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${month}/${day}/${year}`;
  };  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/User.png')} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditDetails', { userId })} // Navigate to EditDetails with userId
          >
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Parent Name</Text>
            <Text style={styles.infoText}>{userData.parentName}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoText}>{userData.emailId}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Phone Number</Text>
            <Text style={styles.infoText}>{userData.mobile}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Name</Text>
            <Text style={styles.infoText}>{userData.childName}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Date of Birth</Text>
            <Text style={styles.infoText}>{formatDateString(userData.childDOB)}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Gender</Text>
            <Text style={styles.infoText}>{userData.childGender}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.bottomNavigation}>
        <AnimatedIcon
          name="comments"
          size={width * 0.08}
          isActive={isActive('Feedback')}
          label="Feedback"
          onPress={() => navigation.navigate('Feedback', {
            userId: userId,  // Pass the UserId as a prop
          })}
        />

        <AnimatedIcon
          name="phone"
          size={width * 0.08}
          isActive={isActive('Contact')}
          label="Contact"
          onPress={() => navigation.navigate('Contact', {
            userId: userId,  // Pass the UserId as a prop
          })}
        />

        <AnimatedIcon
          name="home"
          size={width * 0.08}
          isActive={isActive('Dashboard')}
          label="Home"
          onPress={() => navigation.navigate('Dashboard', {
            userId: userId,  // Pass the UserId as a prop
          })}
        />

        <AnimatedIcon
          name="user-circle"
          size={width * 0.08}
          isActive={isActive('UserData')}
          label="Profile"
          onPress={() => navigation.navigate('UserData', {
            userId: userId,  // Pass the UserId as a prop
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#99E7E1',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    marginTop: 20, // Reduced margin for a tighter layout
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    marginTop: 50,
    borderColor: '#05BEC6', // Add border for better visibility and style
  },
  editIcon: {
    position: 'absolute',
    top: 50,
    right: width * 0.27, // Adjust position to align closely with the top-right corner
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly opaque background for better contrast
    borderRadius: 50,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.9, // Set width to 90% for more padding around edges
    paddingVertical: 20,
    paddingHorizontal: 25,
    elevation: 10,
  },
  infoBlock: {
    backgroundColor: '#f2f2f2', // Light background for individual info blocks
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15, // Increased space between blocks for clearer separation
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: 'LexendDeca_700Bold',
    color: '#444', // Darker text color for titles
    marginBottom: 3,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#333', // Darker shade for text
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E9FEFF',
    borderRadius: 20,
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
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    backgroundColor: '#FF6347', // New color for better visibility
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30, // Increase top margin for spacing
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default UserData;
