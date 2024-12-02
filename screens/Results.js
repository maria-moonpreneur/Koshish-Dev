import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Result = () => {
  const route = useRoute();
  const { testId } = route.params; // Get the TestId from the navigation parameters
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Fetch the test result using the TestId
    fetch(`https://koshishcdc.com/api/AutismTest/GetById?TestId=${encodeURIComponent(testId)}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.response) {
          setResultData(data.response); // Set the fetched data
        } else {
          Alert.alert('Error', 'Failed to fetch the test results.');
        }
      })
      .catch((error) => {
        console.error('Error fetching test result:', error);
        Alert.alert('Error', 'An error occurred while fetching the test results.');
      })
      .finally(() => setLoading(false));
  }, [testId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!resultData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No results available.</Text>
      </View>
    );
  }

  // Determine the color based on the result value
  const getColor = (value) => {
    if (value < 30) {
      return 'green';
    } else if (value < 35) {
      return 'yellow';
    } else if (value < 40) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  // Calculate the width percentage based on the result value (out of 60)
  const barWidth = (resultData.result / 60) * 100;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>C.A.R.S</Text>
      <Text style={styles.subTitle}>The Childhood Autism Rating Scale (Eric Schopler & Barbara Rochen Renner)</Text>

      {/* Custom Bar Graph */}
      <View style={styles.customGraphContainer}>
        <View style={[styles.barBackground, { width: '100%' }]}>
          <View style={[styles.barFill, { width: `${barWidth}%`, backgroundColor: getColor(resultData.result) }]} />
        </View>
        <Text style={styles.barLabel}>{`${resultData.result}%`}</Text>
      </View>

      {/* Color Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>(15 - 30) No Autism</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'yellow' }]} />
          <Text style={styles.legendText}>(30 - 35) Mild Autism</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'orange' }]} />
          <Text style={styles.legendText}>(35 - 40) Moderate Autism</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>(40 - 60) Severely Autism</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  studentLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  customGraphContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  barBackground: {
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  barLabel: {
    marginTop: 10,
    fontSize: 16,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});

export default Result;
