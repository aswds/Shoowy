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
        headerTintColor: Colors.light.accentColor,
        headerBackTitleStyle: {
          fontFamily: "Bold",
        },
        contentStyle: {
          paddingHorizontal: 20,
          backgroundColor: Colors.light.background,
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
