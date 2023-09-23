import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box } from "@gluestack-ui/themed";
import BGBox from "../../components/Screen/BGBox";
import Title from "../../components/Title/Title";
import AuthForm from "../../components/Auth/AuthForm";
import { AuthFields } from "../../components/Auth/types";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";
import CustomModal from "../../components/Modal/CustomModal";
import Verification from "../../screens/VerificationScreen";
import { useRouter } from "expo-router";
import { initializeError } from "../../utils/initilizeError";

const PasswordResetScreen = () => {
  const resetFields: AuthFields = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      icon: <Feather name="mail" size={24} color={Colors.secondaryText} />,
      name: "reset_email",
    },
  ];
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();
  function showError(err: string) {
    initializeError(setIsLoading, setIsModalVisible, setError, err);
  }

  const onRequestReset = async (formData: Record<"reset_email", "string">) => {
    setIsLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: formData.reset_email,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      showError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };
  const onReset = async (code: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      showError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <>
      {!successfulCreation ? (
        <AuthForm
          fields={resetFields}
          onSubmit={onRequestReset}
          screenLabel={{
            label: "Reset Password",
            description: "It seems someone forgot password",
          }}
          isLoading={loading || !isLoaded}
          showLogo={false}
        />
      ) : (
        <Verification
          loading={loading}
          title="Verification"
          onVerify={onReset}
          isEmailVerification={false}
        />
      )}
      <CustomModal
        onSubmit={() => setIsModalVisible(false)}
        text={error}
        title={"Error"}
        visible={isModalVisible}
      />
    </>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({});
