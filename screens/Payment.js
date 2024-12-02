// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, ActivityIndicator } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// // import { WebView } from 'react-native-webview';
// import RazorpayCheckout from 'react-native-razorpay';

// const { width } = Dimensions.get('window');

// const Payment = () => {
//   const [parentName, setParentName] = useState('');
//   const [childName, setChildName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [paymentUrl, setPaymentUrl] = useState('');
//   const [razorpayKey, setRazorpayKey] = useState('');
//   const [razorpaySecret, setRazorpaySecret] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [amount, setAmount] = useState(null);
  
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { userId, testName } = route.params;
//   console.log(userId, testName);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
//         const json = await response.json();
//         console.log('User Data:', json);
        
//         const parent = json.response.parentName ? json.response.parentName.trim() : 'Parent Name \nNot Available';
//         const child = json.response.childName
//           ? json.response.childName.trim()
//           : json.response.details?.childName
//           ? json.response.details.childName.trim()
//           : 'Child Name Not Available';

//         setParentName(parent);
//         setChildName(child);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     const fetchRazorpayDetails = async () => {
//       try {
//         if (!testName || !userId) {
//           Alert.alert('Error', 'TestName or UserId is missing.');
//           return;
//         }

//         const formData = new FormData();
//         formData.append('TestName', testName);
//         formData.append('UserId', userId);
//         formData.append('Remarks', 'App Payment');

//         const response = await fetch('https://koshishcdc.com/api/ProcessPay/InitiateCheckout', {
//           method: 'POST',
//           headers: {
//             accept: '*/*',
//           },
//           body: formData,
//         });

//         const json = await response.json();
//         console.log('Razorpay Details:', json);

//         if (json.status && json.data) {
//           setEmail(json.data.email);
//           setContact(json.data.contactNumber);
//           setRazorpayKey(json.data.razorpayKey);
//           setRazorpaySecret(json.data.razorpaySecretKey);
//           setAmount(json.data.amount); // Assuming amount in API is in paise
//         } else {
//           const errorMessage = json.errors ? JSON.stringify(json.errors) : 'Unable to retrieve Razorpay details.';
//           Alert.alert('Payment Error', errorMessage);
//         }
//       } catch (error) {
//         console.error('Failed to fetch Razorpay details:', error);
//         Alert.alert('Error', 'Failed to retrieve payment details.');
//       }
//     };

//     fetchUserData();
//     fetchRazorpayDetails();
//   }, [userId, testName]);

//   const initiatePayment = async () => {
//     setLoading(true);
//     try {
//       if (!razorpayKey || !razorpaySecret) {
//         Alert.alert('Error', 'Razorpay details are not available.');
//         setLoading(false);
//         return;
//       }

//       const authHeader = `Basic ${btoa(`${razorpayKey}:${razorpaySecret}`)}`;
//       console.log('Authorization Header:', authHeader);

//       const response = await fetch('https://api.razorpay.com/v1/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: authHeader,
//         },
//         body: JSON.stringify({
//           amount: amount * 100, // Convert back to paise
//           currency: 'INR',
//           receipt: 'order_rcptid_11',
//           payment_capture: 1,
//         }),
//       });

//       const json = await response.json();
//       console.log('Razorpay Order Response:', json);

//       if (json.id) {
//         const { id: orderId } = json;
//         const paymentPageUrl = `https://api.razorpay.com/v1/checkout/embedded?order_id=${orderId}&key_id=${razorpayKey}&amount=${amount * 100}&currency=INR&name=${testName}&prefill[email]=${email}&prefill[contact]=${contact}`;
//         setPaymentUrl(paymentPageUrl);
//       } else {
//         Alert.alert('Payment Error', 'Failed to create Razorpay order.');
//       }
//     } catch (error) {
//       console.error('Payment initiation failed:', error);
//       Alert.alert('Error', 'Failed to initiate payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWebViewNavigationStateChange = (newNavState) => {
//     const { url } = newNavState;
//     if (!url) return;
  
//     console.log('Navigated to URL:', url); // Log each URL change
  
//     if (url.includes('payment-success')) {
//       Alert.alert('Payment Successful!', 'Your payment was successful.');
//       navigation.navigate('Success', { userId, testName });
//     } else if (url.includes('payment-failure')) {
//       Alert.alert('Payment Failed', 'Your payment could not be completed.');
//       navigation.navigate('Failure', { userId, testName });
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       {paymentUrl ? (
//         <WebView
//           source={{ uri: paymentUrl }}
//           style={styles.webview}
//           onNavigationStateChange={handleWebViewNavigationStateChange}
//           startInLoadingState={true}
//           renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
//         />
//       ) : (
//         <View style={styles.innerContainer}>
//           <View style={styles.infoContainer}>
//             <Text style={styles.boldText}>Parent Name: </Text>
//             <Text style={styles.infoText}>{parentName}</Text>
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.boldText}>Child Name: </Text>
//             <Text style={styles.infoText}>{childName}</Text>
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.infoText}>You are about to pay </Text>
//             <Text style={styles.boldText}>Rs. {amount}</Text>
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.infoText}>{` for the ${testName}`}</Text>
//           </View>

//           <TouchableOpacity
//             style={styles.optionButton}
//             onPress={initiatePayment}
//             disabled={loading}
//           >
//             <Text style={styles.optionText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#99E7E1',
//     padding: 20,
//   },
//   innerContainer: {
//     alignItems: 'center',
//     paddingVertical: 30,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     marginVertical: 5,
//     justifyContent: 'center',
//   },
//   boldText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   infoText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//   },
//   optionButton: {
//     backgroundColor: '#A7F3D0',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     marginVertical: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   optionText: {
//     fontSize: 18,
//     color: '#000',
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default Payment;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const Payment = () => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');
  const [razorpaySecret, setRazorpaySecret] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [amount, setAmount] = useState(null);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, testName } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
        const json = await response.json();
        
        const parent = json.response.parentName ? json.response.parentName.trim() : 'Parent Name \nNot Available';
        const child = json.response.childName
          ? json.response.childName.trim()
          : json.response.details?.childName
          ? json.response.details.childName.trim()
          : 'Child Name Not Available';

        setParentName(parent);
        setChildName(child);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchRazorpayDetails = async () => {
      try {
        if (!testName || !userId) {
          Alert.alert('Error', 'TestName or UserId is missing.');
          return;
        }

        const formData = new FormData();
        formData.append('TestName', testName);
        formData.append('UserId', userId);
        formData.append('Remarks', 'App Payment');

        const response = await fetch('https://koshishcdc.com/api/ProcessPay/InitiateCheckout', {
          method: 'POST',
          headers: {
            accept: '*/*',
          },
          body: formData,
        });

        const json = await response.json();

        console.log(json);

        if (json.status && json.data) {
          setEmail(json.data.email);
          setContact(json.data.contactNumber);
          setRazorpayKey(json.data.razorpayKey);
          setRazorpaySecret(json.data.razorpaySecretKey);
          setAmount(json.data.amount); // Assuming amount in API is in paise
        } else {
          const errorMessage = json.errors ? JSON.stringify(json.errors) : 'Unable to retrieve Razorpay details.';
          Alert.alert('Payment Error', errorMessage);
        }
      } catch (error) {
        console.error('Failed to fetch Razorpay details:', error);
        Alert.alert('Error', 'Failed to retrieve payment details.');
      }
    };

    fetchUserData();
    fetchRazorpayDetails();
  }, [userId, testName]);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      if (!razorpayKey || !razorpaySecret) {
        Alert.alert('Error', 'Razorpay details are not available.');
        setLoading(false);
        return;
      }
  
      if (!RazorpayCheckout) {
        Alert.alert('Error', 'RazorpayCheckout is not initialized.');
        setLoading(false);
        return;
      }

      const authHeader = `Basic ${btoa(`${razorpayKey}:${razorpaySecret}`)}`;
  
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert back to paise
          currency: 'INR',
          receipt: 'order_rcptid_11',
          payment_capture: 1,
        }),
      });
  
      const json = await response.json();

      console.log(json);

      if (json.id) {
        const { id: id } = json;

        console.log(id);

        const options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.jpg',
          currency: 'INR',
          key: razorpayKey,
          amount: amount * 100,
          name: testName,
          order_id: id, // Razorpay order ID
          prefill: {
            email: email,
            contact: contact,
            name: 'App User',
          },
          theme: { color: '#53a20e' },
        };
  
        RazorpayCheckout.open(options)
          .then((data) => {
            alert(`Success: ${data.razorpay_payment_id}`);
            navigation.navigate('Success', { userId, testName });
          })
          .catch((error) => {
            const errorMessage = error?.description || error?.message || 'Unknown error occurred';
            const errorCode = error?.code || 'N/A';
            alert(`Error: ${errorCode} | ${errorMessage}`);
            navigation.navigate('Failure', { userId, testName });
          });
      } else {
        Alert.alert('Payment Error', 'Failed to create Razorpay order.');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      Alert.alert('Error', 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>Parent Name: </Text>
          <Text style={styles.infoText}>{parentName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>Child Name: </Text>
          <Text style={styles.infoText}>{childName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>You are about to pay </Text>
          <Text style={styles.boldText}>Rs. {amount}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{` for the ${testName}`}</Text>
        </View>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={initiatePayment}
          disabled={loading}
        >
          <Text style={styles.optionText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99E7E1',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#A7F3D0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Payment;
