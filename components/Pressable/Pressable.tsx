import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Pressable } from "@gluestack-ui/themed";

interface PressableProps
  extends Omit<React.ComponentProps<typeof Pressable>, "style"> {
  style?: ViewStyle;
}

const CPressable: React.FC<PressableProps> = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: props.backgroundColor,
          opacity: pressed ? 0.1 : 1,
        },
        props.style,
      ]}
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

export default CPressable;
