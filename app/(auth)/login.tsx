import { StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
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
import { useSignIn } from "@clerk/clerk-expo";

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
      icon: <AntDesign name="eyeo" size={iconSize} color={iconColor} />,
      name: "login_password",
      placeholder: "Enter your password",
    },
  ];
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const { isLoaded, setActive, signIn } = useSignIn();
  const onLogin = (formData) => {
    signIn(formData);
  };
  return (
    <AuthForm
      fields={loginFields}
      onSubmit={() => {}}
      screenLabel={{
        label: "Log in",
        description: "Welcome back!",
      }}
      isLoading={loading}
    />
  );
};

export default Login;

const styles = StyleSheet.create({});
