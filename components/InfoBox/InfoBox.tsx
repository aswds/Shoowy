import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";

interface InfoBoxProps {
  infoTitle: string;
  data: string;
  onPress: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ data, infoTitle, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        height={150}
        width={160}
        backgroundColor={Colors.card}
        shadowOpacity={0.2}
        shadowRadius={3}
        padding={20}
        borderRadius={30}
        shadowOffset={{
          height: 2,
          width: 0,
        }}
      >
        <Text fontFamily="Bold" size={"2xl"} color={Colors.accentColor}>
          {infoTitle}
        </Text>
        <Box flex={1} justifyContent="center">
          <Text fontFamily="Medium" size={"md"} alignItems="center">
            {data}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default InfoBox;

const styles = StyleSheet.create({});
