import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { router } from "expo-router";
import Colors from "../../constants/Colors";
import CText from "../Text/Text";

interface CBProps extends React.ComponentProps<typeof TouchableOpacity> {
  label: string;
  textColor?: string;
  onPress: () => void;
  backgroundColor?: string;
}

const CustomButton = ({
  label,
  onPress,
  textColor,
  backgroundColor,
  ...props
}: CBProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: backgroundColor ?? Colors.accentColor,
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.7}
      {...props}
    >
      <CText color={textColor ?? Colors.background} fontFamily="B" size="lg">
        {label}
      </CText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
