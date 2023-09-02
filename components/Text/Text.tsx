import { StyleSheet, View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import React from "react";

interface CTextProps extends React.ComponentProps<typeof Text> {
  fontFamily: "Regular" | "Medium" | "Bold";
}

const CText: React.FC<CTextProps> = ({ fontFamily, ...props }) => {
  return <Text {...props}>{props.children}</Text>;
};

export default CText;
