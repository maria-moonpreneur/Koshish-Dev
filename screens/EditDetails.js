import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [formData, setFormData] = useState({
    MothersProfession: '',
    Mobile: '',
    Language: '',
    FathersFullName: '',
    ChildName: '',
    FathersProfession: '',
    GeneralComplaint: '',
    isActive: true,
    MotherTongue: '',
    ParentName: '',
    EmailId: '',
    ChildDOB: '',
    ChildGender: '',
    Age: '',
    Address: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
        const result = await response.json();
        const user = result.response;
        console.log(user);
  
        setFormData({
          MothersProfession: user.details?.mothersProfession || '',
          Mobile: user.mobile || '',
          Language: user.details?.language || '',
          FathersFullName: user.details?.fathersFullName || '',
          ChildName: user.childName || '',
          FathersProfession: user.details?.fathersProfession || '',
          GeneralComplaint: user.details?.generalComplaint || '',
          isActive: user.isActive || true,
          MotherTongue: user.details?.motherTongue || '',
          ParentName: user.parentName || '',
          EmailId: user.emailId || '',
          ChildDOB: user.childDOB ? formatDateWithoutTimezone(user.childDOB) : '',
          ChildGender: user.childGender || '',
          Age: user.age ? String(user.age) : '',
          Address: user.addresss || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [userId]);
  
  // Helper function to format date as YYYY-MM-DD without timezone conversion
  const formatDateWithoutTimezone = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    
    // Adding fields to FormData with the correct nested names
    formDataToSend.append('details.MothersProfession', formData.MothersProfession);
    formDataToSend.append('Mobile', formData.Mobile);
    formDataToSend.append('details.Language', formData.Language);
    formDataToSend.append('details.FathersFullName', formData.FathersFullName);
    formDataToSend.append('UserId', userId); // Adding UserId from route params
    formDataToSend.append('ChildName', formData.ChildName);
    formDataToSend.append('details.FathersProfession', formData.FathersProfession);
    formDataToSend.append('CreateDate', ''); // Adjust if needed
    formDataToSend.append('details.GeneralComplaint', formData.GeneralComplaint);
    formDataToSend.append('isActive', formData.isActive);
    formDataToSend.append('details.MotherTongue', formData.MotherTongue);
    formDataToSend.append('ParentName', formData.ParentName);
    formDataToSend.append('Role', ''); // Adjust if needed
    formDataToSend.append('UpdateDate', ''); // Adjust if needed
    formDataToSend.append('EmailId', formData.EmailId);
    formDataToSend.append('details.IsJointFamily', ''); // Adjust if needed
    formDataToSend.append('details.LanguagesUsedByChild', ''); // Adjust if needed
    formDataToSend.append('EmployeeName', 'Koshish App'); // or 'App User'
    formDataToSend.append('details.ChildName', formData.ChildName);
    formDataToSend.append('ChildDOB', `${formatDateWithoutTimezone(formData.ChildDOB)} 00:00:00.000`);
    formDataToSend.append('Password', ''); // Adjust if needed
    formDataToSend.append('ChildGender', formData.ChildGender);
    formDataToSend.append('details.ProvisionalDiagnosis', ''); // Adjust if needed
    formDataToSend.append('details.MothersFullName', ''); // Adjust if needed
    formDataToSend.append('Age', calculateAge(formData.ChildDOB));
    formDataToSend.append('CreatedBy', ''); // Adjust if needed
    formDataToSend.append('Addresss', formData.Address); // Adjusted as per API requirement
  
    // Log the FormData for debugging
    console.log('API Request Body (FormData):', formDataToSend);
  
    try {
      const response = await fetch('https://koshishcdc.com/api/User/Update', {
        method: 'POST',
        headers: {
          Accept: '*/*', // FormData automatically sets Content-Type
        },
        body: formDataToSend,
      });
      const result = await response.json();
  
      if (result?.response?.result?.message === 'Record Updated SuccessFully') {
        Alert.alert('Success', 'User details updated successfully!');
        navigation.goBack();
      } else {
        console.error('API Error Response:', result);
        Alert.alert('Error', 'Failed to update user details.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Error', 'An error occurred while updating user details.');
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color="#05BEC6" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit User Details</Text>
      
      {/* Input fields */}
      {[
        { label: 'Mother\'s Profession', name: 'MothersProfession' },
        { label: 'Mobile', name: 'Mobile' },
        { label: 'Language', name: 'Language' },
        { label: 'Father\'s Full Name', name: 'FathersFullName' },
        { label: 'Child Name', name: 'ChildName' },
        { label: 'Father\'s Profession', name: 'FathersProfession' },
        { label: 'General Complaint', name: 'GeneralComplaint' },
        { label: 'Mother Tongue', name: 'MotherTongue' },
        { label: 'Parent Name', name: 'ParentName' },
        { label: 'Email', name: 'EmailId' },
        { label: 'Child Date of Birth', name: 'ChildDOB' },
        { label: 'Child Gender', name: 'ChildGender' },
        { label: 'Age', name: 'Age' },
        { label: 'Address', name: 'Address' },
      ].map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={formData[field.name]}
            onChangeText={(text) => handleChange(field.name, text)}
            placeholder={`Enter ${field.label}`}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E5F6F5', // Light blue background
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: '#333',
    fontFamily: 'LexendDeca_700Bold',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
  submitButton: {
    backgroundColor: '#05BEC6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'LexendDeca_700Bold',
  },
});

export default EditDetails;
