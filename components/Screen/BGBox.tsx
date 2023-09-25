import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { isAndroid } from "../../utils/platformUtils";

const BGBox = (
  props: React.ComponentProps<typeof Box> & {
    isKeyboardAvoidingViewDisabled?: boolean;
  }
) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        props.isKeyboardAvoidingViewDisabled
          ? null
          : isAndroid()
          ? "height"
          : "padding"
      }
    >
      <ScrollView
        style={{
          backgroundColor: props.backgroundColor ?? Colors.background,
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: props.backgroundColor ?? Colors.background,
          paddingHorizontal: 20,
          paddingTop: insets.top,
          paddingBottom: isAndroid() ? 20 : 0,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Box backgroundColor={Colors.background} {...props} height={"100%"}>
          {props.children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BGBox;

const styles = StyleSheet.create({});
