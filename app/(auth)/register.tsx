import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
} from "@gluestack-ui/themed";
import Title from "../../components/Title/Title";
import BGBox from "../../components/Screen/BGBox";
import CustomInput from "../../components/Input/Input";
import CustomButton from "../../components/Button/CustomButton";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import AuthForm from "../../components/Auth/AuthForm";
import { AuthFields } from "../../components/Auth/types";
import { iconSize, iconColor } from "./constans";
import { useSignUp } from "@clerk/clerk-expo";
import CustomModal from "../../components/Modal/CustomModal";

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
      icon: (
        <Feather name="mail" size={24} color={Colors.light.secondaryText} />
      ),
      name: "register_email",
      placeholder: "Enter your email address",
    },
    {
      label: "Password",
      icon: <AntDesign name="eyeo" size={iconSize} color={iconColor} />,
      name: "register_password",
      placeholder: "Enter your password",
    },
  ];
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const onSignUp = async (formData: Record<fieldsName, string>) => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.register_email,
        password: formData.register_password,
        username: formData.register_username,
      });
    } catch (error) {
      setIsLoading(false);
      setError(error.errors[0].message);
      setIsModalVisible(true);
    }
  };
  return (
    <>
      <AuthForm
        fields={registerFields}
        onSubmit={onSignUp}
        screenLabel={{ label: "Sign up", description: "Join us!" }}
        isLoading={loading}
        error={error}
      />
      {isModalVisible && (
        <CustomModal
          onClose={() => {
            setIsModalVisible(false);
          }}
          onSubmit={() => {}}
          text={error}
          title={"Error"}
          visible={isModalVisible}
        />
      )}
    </>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({});
