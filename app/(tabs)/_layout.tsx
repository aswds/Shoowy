import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import Colors from "../../constants/Colors";
import { Stack } from "expo-router";
const TabsLayout = () => {
  const iconSize = 30;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors.accentColor,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          width: "100%",
          elevation: 0,
        },

        tabBarShowLabel: false,
      }}
      initialRouteName="main"
    >
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: (props) => {
            return (
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={iconSize}
                color={
                  props.focused ? Colors.accentColor : Colors.secondaryText
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons
                name="water"
                size={35}
                color={
                  props.focused ? Colors.accentColor : Colors.secondaryText
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: (props) => {
            return (
              <FontAwesome5
                name="user-alt"
                size={20}
                color={
                  props.focused ? Colors.accentColor : Colors.secondaryText
                }
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
