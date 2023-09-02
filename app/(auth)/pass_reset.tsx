import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box } from "@gluestack-ui/themed";
import BGBox from "../../components/Screen/BGBox";
import Title from "../../components/Title/Title";
import AuthForm from "../../components/Auth/AuthForm";
import { AuthFields } from "../../components/Auth/types";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const PasswordResetScreen = () => {
  const resetFields: AuthFields = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      icon: (
        <Feather name="mail" size={24} color={Colors.light.secondaryText} />
      ),
      name: "reset_email",
    },
  ];
  const [loading, setIsLoading] = useState<boolean>(false);
  const onPassReset = () => {};
  return (
    <AuthForm
      fields={resetFields}
      onSubmit={() => {}}
      screenLabel={{
        label: "Reset Password",
        description: "It seems someone forgot password",
      }}
      isLoading={loading}
    />
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({});
