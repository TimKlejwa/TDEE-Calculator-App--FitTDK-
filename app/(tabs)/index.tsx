import React, { useState } from "react";
import { View, Text, TextInput, Button, Animated, Easing, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  GetStartedScreen: undefined;
  MainScreen: undefined;
  ResultScreen: { 
    date: Date;
    weight: string;
    goalWeight: string;
    goalChangePerWeek: string;
    height: string;
    age: string;
    gender: string;
    activityLevel: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, "GetStartedScreen">;

export default function GetStartedScreen({ navigation }: Props) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [goalChangePerWeek, setGoalChangePerWeek] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("Low");
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnim = new Animated.Value(0);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    toggleDatepicker();
  };

  const handleNext = () => {
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      slideAnim.setValue(500);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmit = () => {
    console.log("User info saved:", {
      date,
      weight,
      goalWeight,
      goalChangePerWeek,
      height,
      age,
      gender,
      activityLevel,
    });

    // Navigate to ResultScreen and pass the collected data
    navigation.navigate("ResultScreen", {
      date,
      weight,
      goalWeight,
      goalChangePerWeek,
      height,
      age,
      gender,
      activityLevel,
    });
  };

  return (
    <View style={styles.container}>
      {currentStep === 0 ? (
        // Welcome screen with logo
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome! Let's get started.</Text>
          <Button title="Get Started" onPress={() => setCurrentStep(1)} color="green" />
        </View>
      ) : (
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          {currentStep === 1 && (
            <View>
              <Text>Start Date:</Text>
              <Text>{date.toLocaleDateString()}</Text>
              <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={onChange}
                onCancel={toggleDatepicker}
                date={date}
              />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text>Starting Weight (lbs):</Text>
              <TextInput
                placeholder="Enter weight"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
              />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <Text>Goal Weight (lbs):</Text>
              <TextInput
                placeholder="0.0"
                keyboardType="numeric"
                value={goalWeight}
                onChangeText={setGoalWeight}
                style={styles.input}
              />
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <Text>Goal Change per Week (lbs):</Text>
              <TextInput
                placeholder="0.0"
                keyboardType="numeric"
                value={goalChangePerWeek}
                onChangeText={setGoalChangePerWeek}
                style={styles.input}
              />
            </View>
          )}

          {currentStep === 5 && (
            <View>
              <Text>Height (inches):</Text>
              <TextInput
                placeholder="0.0"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                style={styles.input}
              />
            </View>
          )}

          {currentStep === 6 && (
            <View>
              <Text>Age:</Text>
              <TextInput
                placeholder="Enter age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                style={styles.input}
              />
            </View>
          )}

          {currentStep === 7 && (
            <View>
              <Text>Gender:</Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          )}

          {currentStep === 8 && (
            <View>
              <Text>Activity Level:</Text>
              <Picker
                selectedValue={activityLevel}
                onValueChange={(itemValue) => setActivityLevel(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Extreme" value="Extreme" />
              </Picker>
            </View>
          )}

          <Button
            title={currentStep === 8 ? "Submit" : "Next"}
            onPress={currentStep === 8 ? handleSubmit : handleNext}
            color="green"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    paddingLeft: 10,
  },
  picker: {
    width: "100%",
    marginBottom: 20,
  },
});
