import { Pressable, Text } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface SmallIconButton extends React.ComponentProps<typeof Pressable> {
  icon: React.ReactNode;
  label: string;
}

const SmallIconButton: React.FC<SmallIconButton> = ({
  icon,
  label,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
    >
      {icon}
      <Text
        fontFamily="Regular"
        size="sm"
        color={Colors.accentColor}
        alignItems="center"
        justifyContent="center"
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default SmallIconButton;

const styles = StyleSheet.create({});
