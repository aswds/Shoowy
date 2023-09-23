import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { useUser } from "@clerk/clerk-expo";
import CustomModal from "../../components/Modal/CustomModal";
import { initializeError } from "../../utils/initilizeError";
const EditPassword = () => {
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const { user } = useUser();
  function showError(message: string) {
    initializeError(setIsLoading, setIsModalVisible, setError, message);
  }
  async function updatePassword(
    formData: Record<"current_password" | "new_password", string>
  ) {
    try {
      await user?.updatePassword({
        currentPassword: formData.current_password,
        newPassword: formData.new_password,
      });
    } catch (error) {
      showError(error.errors[0].message);
    }
  }
  const fields = [
    {
      label: "Current Password",
      icon: null,
      name: "current_password",
      placeholder: "Enter your current password",
    },
    {
      label: "New Password",
      icon: null,
      name: "new_password",
      placeholder: "Enter your new password",
    },
  ];
  return (
    <>
      <AuthForm
        fields={fields}
        isLoading={loading}
        onSubmit={updatePassword}
        screenLabel={{
          label: "Password",
          description: "Change your password",
        }}
        buttonTitle="Change"
      />
      <CustomModal
        text={error}
        visible={isModalVisible}
        onSubmit={() => {
          setIsModalVisible(false);
        }}
        title="Error"
        submitButtonText="Ok"
      />
    </>
  );
};

export default EditPassword;

const styles = StyleSheet.create({});
