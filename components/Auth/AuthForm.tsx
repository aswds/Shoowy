import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { Box, Text } from "@gluestack-ui/themed";
import CustomButton from "../Button/CustomButton";
import CustomInput from "../Input/Input";
import BGBox from "../Screen/BGBox";
import Title from "../Title/Title";
import { AuthFields } from "./types";
import Colors from "../../constants/Colors";
import { isAndroid } from "../../utils/platformUtils";
import { useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";

interface AuthFormProps {
  screenLabel: {
    label: string;
    description: string;
  };
  fields: AuthFields;
  showLogo?: boolean;
  isLoading: boolean;
  onSubmit: (formData: any) => void;
  buttonTitle?: string;
}

const AuthForm = ({
  screenLabel,
  fields,
  isLoading,
  showLogo = true,
  onSubmit,
  buttonTitle,
}: AuthFormProps) => {
  const [formData, setFormData] = React.useState({});
  const router = useRouter();
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const [isPassVisible, setIsPassVisible] = useState(false);
  function changePassVisibility() {
    setIsPassVisible((isVisible) => !isVisible);
  }
  const passwordIcon = isPassVisible ? (
    <Feather
      name="eye"
      size={24}
      color={Colors.secondaryText}
      onPress={changePassVisibility}
    />
  ) : (
    <Feather
      name="eye-off"
      size={24}
      color={Colors.secondaryText}
      onPress={changePassVisibility}
    />
  );
  return (
    <>
      <Spinner visible={isLoading} />

      <BGBox justifyContent="space-evenly" alignItems="center">
        <Title description={screenLabel.description} showLogo={showLogo}>
          {screenLabel.label}
        </Title>
        <Box width={"100%"} rowGap={40}>
          {fields.map((field) => {
            return (
              <CustomInput
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChangeText={(text) => handleInputChange(field.name, text)}
                icon={
                  field.name.includes("password") && field.icon == null
                    ? passwordIcon
                    : field?.icon
                }
                secureTextEntry={
                  field.name.includes("password") && !isPassVisible
                }
                underInput={
                  field.name === "login_password" && (
                    <Text
                      fontFamily="Medium"
                      color={Colors.accentColor}
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => {
                        router.push("/(auth)/pass_reset");
                      }}
                    >
                      Forgot password?
                    </Text>
                  )
                }
              />
            );
          })}
        </Box>

        <CustomButton
          label={buttonTitle ?? screenLabel.label}
          onPress={() => onSubmit(formData)}
        />
      </BGBox>
    </>
  );
};

export default AuthForm;

const styles = StyleSheet.create({});
