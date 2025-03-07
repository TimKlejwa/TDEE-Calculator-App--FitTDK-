import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function TDEECalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>('moderate');
  const [goalChange, setGoalChange] = useState('');
  const [result, setResult] = useState<React.ReactNode>(null);

  const calculateTDEE = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    const goalNum = parseFloat(goalChange);

    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum) || isNaN(goalNum)) {
      setResult(<Text>Please enter valid numbers.</Text>);
      return;
    }

    let bmr;
    if (sex === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const tdee = bmr * (activityMultipliers[activityLevel] || 1.55); // Default to 'moderate' if input is invalid
    const targetCalories = tdee + goalNum * 500;

    setResult(
      <Text>
        TDEE: {tdee.toFixed(2)} kcal/day{'\n'}
        Target Calories: {targetCalories.toFixed(2)} kcal/day
      </Text>
    );
  };

  const handleActivityLevelChange = (text: string) => {
    const validLevels: ('sedentary' | 'light' | 'moderate' | 'active' | 'very_active')[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
    if (validLevels.includes(text as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active')) {
      setActivityLevel(text as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active');
    } else {
      setActivityLevel('moderate'); // Fallback to 'moderate' if the input is invalid
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Height (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Sex (male/female):</Text>
      <TextInput
        style={styles.input}
        value={sex}
        onChangeText={setSex}
      />

      <Text style={styles.label}>Activity Level (sedentary, light, moderate, active, very_active):</Text>
      <TextInput
        style={styles.input}
        value={activityLevel}
        onChangeText={handleActivityLevelChange}
      />

      <Text style={styles.label}>Goal Change per Week (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={goalChange}
        onChangeText={setGoalChange}
      />

      <Button title="Calculate TDEE" onPress={calculateTDEE} />

      {result && <View style={styles.resultContainer}>{result}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set background color to white
    justifyContent: 'center', // Center the content vertically
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor: '#f4f4f4', // Give inputs a light background color for visibility
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#f0f0f0', // Light background color for results
  },
});


