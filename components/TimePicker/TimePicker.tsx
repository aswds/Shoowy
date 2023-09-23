import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import { Text } from "@gluestack-ui/themed";

interface TimePickerProps {
  handleSetTime: (fieldName: string, value: string) => void;
  label: "Warm" | "Cold";
}

const TimePicker: React.FC<TimePickerProps> = ({ handleSetTime, label }) => {
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const styles = StyleSheet.create({
    picker: {
      flex: 1,
      maxWidth: 100,
    },
    pickerItem: {
      color: Colors.background,
      fontFamily: "Bold",
      fontSize: 20,
    },
    pickerContainer: {
      width: "100%",
      backgroundColor: label === "Cold" ? Colors.cold : Colors.hot,
      shadowOpacity: 0.1,
      borderRadius: 30,
      shadowOffset: { height: 2, width: 0 },
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  function createArray(len: number) {
    return Array.from({ length: len + 1 }, (_, index) => index.toString());
  }

  const AVAILABLE_MINUTES = createArray(30);
  const AVAILABLE_SECONDS = createArray(59);
  const handleTimeChange = (minutesValue: string, secondsValue: string) => {
    setMinutes(minutesValue);
    setSeconds(secondsValue);
    handleSetTime(minutesValue, secondsValue); // Pass the selected values to the parent component
  };
  return (
    <View style={styles.pickerContainer}>
      <Text fontFamily="Bold" size="xl" color={Colors.background}>
        {label}
      </Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={minutes}
        onValueChange={(itemValue) => {
          setMinutes(itemValue);
          handleSetTime("minutes", itemValue);
        }}
        mode="dropDown"
      >
        {AVAILABLE_MINUTES.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text fontFamily="Medium" color={Colors.background} size="sm">
        min
      </Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={seconds}
        onValueChange={(itemValue) => {
          setSeconds(itemValue);
          handleSetTime("seconds", itemValue);
        }}
        mode="dropDown"
      >
        {AVAILABLE_SECONDS.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text fontFamily="Medium" color={Colors.background} size="sm">
        sec
      </Text>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({});
