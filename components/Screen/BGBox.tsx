import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";

const BGBox = (
  props: Omit<React.ComponentProps<typeof Box>, "backgroundColor">
) => {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.light.background,
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Box backgroundColor={Colors.light.background} {...props} height={"100%"}>
        {props.children}
      </Box>
    </ScrollView>
  );
};

export default BGBox;

const styles = StyleSheet.create({});
