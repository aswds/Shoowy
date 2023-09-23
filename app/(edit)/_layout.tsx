import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";

const EditLayout = () => {
  const router = useRouter();
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
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: "Edit profile",
          headerShown: true,

          presentation: "fullScreenModal",
          headerLeft: (props) => {
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
          },
        }}
      />
      <Stack.Screen
        name="edit_email"
        options={{
          headerTitle: "",

          headerLeft: (props) => {
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
          },
        }}
      />
      <Stack.Screen
        name="edit_password"
        options={{
          headerLeft: (props) => {
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
          },
        }}
      />
      {/* <Stack.Screen name="shower" /> */}
    </Stack>
  );
};

export default EditLayout;
