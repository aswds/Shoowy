import { StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect } from "react";
import { Box } from "@gluestack-ui/themed";
import CustomButton from "../../components/Button/CustomButton";
import BGBox from "../../components/Screen/BGBox";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import CustomInput from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Colors from "../../constants/Colors";
import AuthForm from "../../components/Auth/AuthForm";
import { AuthFields } from "../../components/Auth/types";
import { iconColor, iconSize } from "./constans";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import CustomModal from "../../components/Modal/CustomModal";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { initializeError } from "../../utils/initilizeError";
const Login = () => {
  const loginFields: AuthFields = [
    {
      label: "Email Address or Username",
      icon: <FontAwesome name="user-o" size={iconSize} color={iconColor} />,
      name: "login_username_email",
      placeholder: "Enter your username or email address",
    },
    {
      label: "Password",
      icon: null,
      name: "login_password",
      placeholder: "Enter your password",
    },
  ];
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const { getToken } = useAuth();
  function showError(err: string) {
    initializeError(setIsLoading, setIsModalVisible, setError, err);
  }

  const { isLoaded, signIn, setActive } = useSignIn();

  const onLogin = async (
    formData: Record<"login_username_email" | "login_password", string>
  ) => {
    setIsLoading(true);
    try {
      if (formData.login_username_email && formData.login_password) {
        const completeSignIn = await signIn!.create({
          identifier: formData.login_username_email,
          password: formData.login_password,
        });
        await setActive({ session: completeSignIn.createdSessionId });
        // const auth = getAuth();
        // const token = await getToken({ template: "integration_firebase" });
        // const userCredentials = await signInWithCustomToken(auth, token);

        /**
         * The userCredentials.user object will call the methods of
         * the Firebase platform as an authenticated user.
         */
      } else {
        showError("Please enter all required fields");
      }
    } catch (error) {
      showError(
        error.errors[0].message === "is unknown"
          ? "We couldn't find user with that credentials"
          : error.errors[0].message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        fields={loginFields}
        onSubmit={onLogin}
        screenLabel={{
          label: "Log in",
          description: "Welcome back!",
        }}
        isLoading={loading || !isLoaded}
      />
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

export default Login;

const styles = StyleSheet.create({});
