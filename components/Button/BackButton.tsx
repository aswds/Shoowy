import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Text } from "@gluestack-ui/themed";
const BackButton = () => {
  return (
    <Text
      fontFamily="Regular"
      alignSelf="flex-start"
      color={Colors.hot}
      onPress={() => {
        router.back();
      }}
    >
      Cancel
    </Text>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
