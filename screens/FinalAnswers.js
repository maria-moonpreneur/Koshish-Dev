import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const FinalAnswers = ({ route }) => {
  const { responses, questionsData, ageInMonths } = route.params;

  // Organize questions by sections and subsections
  const organizedQuestions = Object.keys(questionsData).reduce((acc, section) => {
    const sectionData = {};

    Object.keys(questionsData[section]).forEach((subSection) => {
      const questions = questionsData[section][subSection]
        .filter((question) => responses[question.apiField] !== undefined)
        .map((question) => ({
          question: question.question,
          answer: responses[question.apiField] ? 'Yes' : 'No',
        }));

      if (questions.length > 0) {
        sectionData[subSection] = questions;
      }
    });

    if (Object.keys(sectionData).length > 0) {
      acc[section] = sectionData;
    }
    return acc;
  }, {});

  // Flatten all responses with empty values for missing responses
  const prepareDataForSubmission = () => {
    const data = new FormData();
    
    Object.keys(questionsData).forEach((section) => {
      Object.keys(questionsData[section]).forEach((subSection) => {
        questionsData[section][subSection].forEach((question) => {
          const fieldKey = question.apiField;
          const answer = responses[fieldKey] !== undefined ? (responses[fieldKey] ? 'true' : 'false') : '';
          data.append(fieldKey, answer);
        });
      });
    });
    
    // Include additional fields if necessary
    data.append('ELARLATest.UserId', '8125b8dd-8663-4780-a78a-84afdeec4ad9');
    data.append('ELARLATest.isActive', 'true');
    return data;
  };

  // Handle Submit Button Click
  const handleSubmit = async () => {
    const data = prepareDataForSubmission();

    try {
      const response = await fetch("https://koshishcdc.com/api/ELARLATest/Add", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
        },
        body: data,
      });

      if (response.ok) {
        Alert.alert('Success', 'Test data submitted successfully.');
      } else {
        Alert.alert('Error', 'Failed to submit test data.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Final Answers</Text>

      {Object.keys(organizedQuestions).map((section) => (
        <View key={section} style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>{section}</Text>
          
          {Object.keys(organizedQuestions[section]).map((subSection) => (
            <View key={subSection} style={styles.subSectionContainer}>
              <Text style={styles.subSectionHeader}>{subSection}</Text>
              
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Question</Text>
                  <Text style={styles.tableHeaderText}>Answer</Text>
                </View>
                
                {organizedQuestions[section][subSection].map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.question}</Text>
                    <Text style={styles.tableCell}>{item.answer}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006769',
    marginBottom: 10,
  },
  subSectionContainer: {
    marginBottom: 10,
  },
  subSectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 5,
  },
  table: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#006769',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalAnswers;
