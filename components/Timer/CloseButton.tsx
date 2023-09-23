import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

interface CloseButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  size: number;
  iconColor: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  size,
  iconColor,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <AntDesign name="close" size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default CloseButton;

const styles = StyleSheet.create({});
