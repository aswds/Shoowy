import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { router } from "expo-router";
import Colors from "../../constants/Colors";

interface CBProps {
  label: string;
  onPress: () => void;
}

const CustomButton = ({ label, onPress }: CBProps) => {
  return (
    <Button
      size="lg"
      width={"100%"}
      backgroundColor={Colors.light.accentColor}
      height={60}
      borderRadius={20}
      onPress={onPress}
    >
      <ButtonText color={Colors.light.background} fontFamily="Bold">
        {label}
      </ButtonText>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
