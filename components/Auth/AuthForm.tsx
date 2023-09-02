import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
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
  error?: string;
  isLoading: boolean;
  onSubmit: (formData: any) => void;
}

const AuthForm = ({
  screenLabel,
  fields,
  isLoading,
  error,
  onSubmit,
}: AuthFormProps) => {
  const [formData, setFormData] = React.useState({});
  const router = useRouter();
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isAndroid() ? "height" : "padding"}
    >
      <Spinner visible={isLoading} />
      <BGBox justifyContent="space-evenly" alignItems="center">
        <Title description={screenLabel.description}>{screenLabel.label}</Title>
        <Box width={"100%"} rowGap={40}>
          {fields.map((field) => {
            return (
              <CustomInput
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChangeText={(text) => handleInputChange(field.name, text)}
                icon={field.icon}
                underInput={
                  field.name === "login_password" && (
                    <Text
                      fontFamily="Medium"
                      color={Colors.light.accentColor}
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
          label={screenLabel.label}
          onPress={() => onSubmit(formData)}
        />
      </BGBox>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({});
