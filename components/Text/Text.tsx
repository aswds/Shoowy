import { StyleSheet, View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import React from "react";
import Colors from "../../constants/Colors";

interface CTextProps extends React.ComponentProps<typeof Text> {
  fontFamily: "R" | "M" | "B";
}
const fontMapping: { [key: string]: string } = {
  R: "Regular",
  M: "Medium",
  B: "Bold",
};

const CText: React.FC<CTextProps> = ({ fontFamily, ...props }) => {
  return (
    <Text
      {...props}
      fontFamily={fontMapping[fontFamily]}
      color={Colors.secondaryText}
    >
      {props.children}
    </Text>
  );
};

export default CText;
