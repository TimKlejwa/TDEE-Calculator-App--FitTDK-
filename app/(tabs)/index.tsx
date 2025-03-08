import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Animated, Easing} from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // For date picker
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  GetStartedScreen: undefined;
  MainScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "GetStartedScreen">;

export default function GetStartedScreen({ navigation }: Props) {
  const [startDate, setStartDate] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [goalChangePerWeek, setGoalChangePerWeek] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("Low");
  const [currentStep, setCurrentStep] = useState(0);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const steps = [
    { label: "Start Date", value: startDate, setter: setStartDate },
    { label: "Starting Weight (lbs)", value: weight, setter: setWeight },
    { label: "Goal Weight (lbs)", value: goalWeight, setter: setGoalWeight },
    { label: "Goal Change per Week (lbs)", value: goalChangePerWeek, setter: setGoalChangePerWeek },
    { label: "Height (inches)", value: height, setter: setHeight },
    { label: "Age", value: age, setter: setAge },
    { label: "Gender (Male/Female)", value: gender, setter: setGender },
    { label: "Activity Level", value: activityLevel, setter: setActivityLevel },
  ];

  const slideAnim = new Animated.Value(0);

  const handleNext = () => {
    const currentField = steps[currentStep];
    if (!currentField.value) {
      Alert.alert("Error", "Please fill in the field.");
      return;
    }

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
    if (steps.some((step) => !step.value)) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    console.log("User info saved:", {
      startDate,
      weight,
      goalWeight,
      goalChangePerWeek,
      height,
      age,
      gender,
      activityLevel,
    });
    navigation.replace("MainScreen");
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    setStartDate(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {currentStep === 0 ? (
        // Welcome message and button
        <View>
          <Text>Welcome! Let's get started.</Text>
          <Button title="Get Started" onPress={() => setCurrentStep(1)} />
        </View>
      ) : (
        // Slide transition questions
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          {currentStep === 1 && (
            <>
              <Text>Start Date:</Text>
              <Button title="Pick Date" onPress={showDatePicker} />
              <Text>{startDate || "No date selected"}</Text>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Text>Starting Weight (lbs):</Text>
              <TextInput
                placeholder="Weight"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Text>Goal Weight (lbs):</Text>
              <TextInput
                placeholder="Goal Weight"
                keyboardType="numeric"
                value={goalWeight}
                onChangeText={setGoalWeight}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 4 && (
            <>
              <Text>Goal Change per Week (lbs):</Text>
              <TextInput
                placeholder="0.5"
                keyboardType="numeric"
                value={goalChangePerWeek}
                onChangeText={setGoalChangePerWeek}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 5 && (
            <>
              <Text>Height (inches):</Text>
              <TextInput
                placeholder="Height"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 6 && (
            <>
              <Text>Age:</Text>
              <TextInput
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 7 && (
            <>
              <Text>Gender (Male/Female):</Text>
              <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: "100%", paddingLeft: 10 }}
              />
            </>
          )}

          {currentStep === 8 && (
            <>
              <Text>Activity Level:</Text>
              <Picker selectedValue={activityLevel} onValueChange={setActivityLevel} style={{ width: "100%", marginBottom: 20 }}>
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Extreme" value="Extreme" />
              </Picker>
            </>
          )}

          <Button title={currentStep === steps.length - 1 ? "Submit" : "Next"} onPress={currentStep === steps.length - 1 ? handleSubmit : handleNext} />
        </Animated.View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

