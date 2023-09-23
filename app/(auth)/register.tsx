import { useSignUp } from "@clerk/clerk-expo";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../../components/Auth/AuthForm";
import { AuthFields } from "../../components/Auth/types";
import CustomModal from "../../components/Modal/CustomModal";
import Colors from "../../constants/Colors";
import Verification from "../../screens/VerificationScreen";
import { initializeError } from "../../utils/initilizeError";
import { iconColor, iconSize } from "./constans";

type fieldsName = "register_username" | "register_email" | "register_password";

const RegisterPage = () => {
  const registerFields: AuthFields<fieldsName> = [
    {
      label: "Username",
      icon: <FontAwesome name="user-o" size={iconSize} color={iconColor} />,
      name: "register_username",
      placeholder: "Enter your username",
    },
    {
      label: "Email Address",
      icon: <Feather name="mail" size={24} color={Colors.secondaryText} />,
      name: "register_email",
      placeholder: "Enter your email address",
    },
    {
      label: "Password",
      icon: null,
      name: "register_password",
      placeholder: "Enter your password",
    },
  ];
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  function showError(err: string) {
    initializeError(setIsLoading, setIsModalVisible, setError, err);
  }

  const onSignUp = async (formData: Record<fieldsName, string>) => {
    // Check if the component is loaded
    if (!isLoaded) {
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Check if all required form fields are filled
      if (
        formData.register_email &&
        formData.register_password &&
        formData.register_username
      ) {
        // Create a new user account
        await signUp.create({
          emailAddress: formData.register_email,
          password: formData.register_password,
          username: formData.register_username,
        });

        // Prepare for email address verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Set pending verification flag
        setPendingVerification(true);
        setIsLoading(false);
      } else {
        // Handle case where not all required fields are filled
        showError("Please enter all required fields");
      }
    } catch (error) {
      // Handle errors
      showError(
        error.errors[0].message === "is invalid"
          ? "Invalid Email Address"
          : error.errors[0].message
      );
    }
  };
  const onPressVerify = async (code: string) => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error: any) {
      showError(
        error.errors[0].message === "expired"
          ? "Code is expired"
          : error.errors[0].message
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!pendingVerification ? (
        <AuthForm
          fields={registerFields}
          onSubmit={onSignUp}
          screenLabel={{ label: "Sign up", description: "Join us!" }}
          isLoading={loading}
          showLogo={true}
        />
      ) : (
        <Verification
          loading={loading}
          onVerify={onPressVerify}
          title="Verify Email"
          isEmailVerification
        />
      )}
      <CustomModal
        onSubmit={() => {
          setIsModalVisible(false);
        }}
        text={error}
        title={"Error"}
        visible={isModalVisible}
      />
    </>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({});
