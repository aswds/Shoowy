import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import { router } from "expo-router";
import presets from "../../app/(shower)/presets";
import Title from "../Title/Title";
import { Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
const Circle = ({
  pickedPreset,
  isPresetPicked,
  presets,
}: {
  pickedPreset?: number;
  isPresetPicked?: boolean;
  presets: any[];
}) => {
  return (
    <Box alignItems="center" justifyContent="space-evenly" flex={2}>
      <Title showLogo={false}>Let's Start</Title>
      <TouchableOpacity
        style={styles.circle}
        activeOpacity={0.8}
        onPress={() => {
          if (isPresetPicked) {
            const presetData = presets[pickedPreset];
            router.push({
              pathname: "/(shower)/shower",
              params: presetData,
            });
          }
        }}
      >
        {!isPresetPicked && (
          <Ionicons name="timer-outline" size={50} color={Colors.background} />
        )}
        <Text fontFamily="Bold" size="xl" color={Colors.background}>
          {isPresetPicked ? "Start" : "Pick a preset"}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    backgroundColor: Colors.accentColor,
    width: 250,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
});
