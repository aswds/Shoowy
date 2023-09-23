import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CText from "../Text/Text";

interface TimerButtonProps {
  buttonText: string;
  onPress: () => void;
  
}

const TimerButton = ({ buttonText, onPress }: TimerButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        width: 120,
        height: 70,
        borderRadius: 999,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <CText fontFamily="B">{buttonText}</CText>
    </TouchableOpacity>
  );
};

export default TimerButton;

const styles = StyleSheet.create({});
