import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
import BackButton from "../../components/Button/BackButton";

const ShowerLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        contentStyle: {},
        headerTitle: "",
        headerTintColor: Colors.accentColor,
      }}
    >
      <Stack.Screen
        name="presets"
        options={{
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="shower"
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ShowerLayout;

const styles = StyleSheet.create({});
