import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CText from "../Text/Text";
import { Box } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";

interface EmptyListProps {
  icon: React.ReactNode;
  text: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ icon, text }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      {/* {icon} */}

      <CText fontFamily="M" color={Colors.secondaryText} size="sm">
        {text}
      </CText>
    </Box>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
