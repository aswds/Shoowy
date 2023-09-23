import { StyleSheet, View } from "react-native";
import React from "react";
import { Box, Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";

interface WideBarProps extends React.PropsWithChildren {
  barTitle: string;
  barData?: string;
  barTitleProps?: React.ComponentProps<typeof Text>;
}

const WideBar: React.FC<WideBarProps> = ({
  barData,
  barTitle,
  barTitleProps,
  children,
}) => {
  return (
    <Box
      width={"100%"}
      minHeight={"10%"}
      backgroundColor={Colors.card}
      borderRadius={35}
      paddingVertical={20}
      paddingHorizontal={25}
    >
      {barTitle && (
        <Text
          fontFamily="Bold"
          size="xl"
          color={Colors.accentColor}
          {...barTitleProps}
          mb={10}
        >
          {barTitle}
        </Text>
      )}
      {children ?? (
        <Text fontFamily="Bold" size="lg">
          {barData}
        </Text>
      )}
    </Box>
  );
};

export default WideBar;

const styles = StyleSheet.create({});
