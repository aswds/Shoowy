import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "../../constants/Colors";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: Colors.accentColor,
        headerBackTitleStyle: {
          fontFamily: "Bold",
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
        headerTitle: "",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="pass_reset" />
      <Stack.Screen name="initial_screen" />
    </Stack>
  );
};

export default PublicLayout;
