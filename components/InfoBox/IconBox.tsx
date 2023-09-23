import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
import * as Haptics from "expo-haptics";
interface IconBoxProps {
  icon: React.ReactNode;
  title: string;
  isPicked: boolean;
  onPress: () => void;
}

const IconBox: React.FC<IconBoxProps> = ({
  icon,
  title,
  isPicked,
  onPress,
}) => {
  return (
    <Pressable
      flex={1}
      backgroundColor={Colors.card}
      shadowOpacity={0.1}
      shadowRadius={3}
      alignItems="center"
      justifyContent="space-evenly"
      padding={20}
      borderRadius={30}
      shadowOffset={{
        height: 2,
        width: 0,
      }}
      borderWidth={1.5}
      borderColor={isPicked ? Colors.accentColor : Colors.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      sx={{ ":hover": { bg: "$primary400" } }}
    >
      {icon}
      <Text fontFamily="Medium" size="md">
        {title}
      </Text>
    </Pressable>
  );
};

export default IconBox;

const styles = StyleSheet.create({});
