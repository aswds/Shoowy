import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import CustomModal from "../../components/Modal/CustomModal";
import Colors from "../../constants/Colors";
import Verification from "../../screens/VerificationScreen";
import { initializeError } from "../../utils/initilizeError";
import { useRouter } from "expo-router";
const EditEmail = () => {
  const [verificationPending, setVerificationPending] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  // const { user } = useUser();
  const { user } = useUser();
  const router = useRouter();
  function showError(err: string) {
    initializeError(setIsLoading, setIsModalVisible, setError, err);
  }
  const fields = [
    {
      label: "Email Address",
      icon: <Feather name="mail" size={24} color={Colors.secondaryText} />,
      name: "email",
      placeholder: "Enter your email address",
    },
  ];
  const resetEmail = async (formData) => {
    let newUserAddress = null;
    try {
      const email = await user?.createEmailAddress({
        email: formData.email,
      });

      email?.prepareVerification({
        strategy: "email_code",
      });
      setVerificationPending(true);
    } catch (error) {
      newUserAddress = user?.emailAddresses[0]?.emailAddress;
      const errorCode = error.errors[0].code;
      if (
        errorCode === "form_verification_needed" &&
        newUserAddress === formData.email
      ) {
        user?.emailAddresses[0].prepareVerification({
          strategy: "email_code",
        });
        setVerificationPending(true);
        return;
      } else if (
        errorCode === "form_identifier_exists" &&
        newUserAddress === formData.email
      ) {
        user?.emailAddresses[0].prepareVerification({
          strategy: "email_code",
        });
        setVerificationPending(true);
        return;
      }
      showError(
        error.errors[0].message === "is invalid"
          ? "Invalid Email Address"
          : error.errors[0].message
      );
    }
  };
  const verifyEmail = async (verificationCode: string) => {
    try {
      const completeChangeEmail =
        await user?.emailAddresses[0].attemptVerification({
          code: verificationCode,
        });
      user
        ?.update({
          primaryEmailAddressId: completeChangeEmail?.id,
        })
        .then(() => {
          user.emailAddresses[1].destroy();
          router.push("/(edit)/edit");
        });
    } catch (err) {
      setError(err.errors[0].longMessage);
      setIsModalVisible(true);
    }
  };
  return (
    <>
      {!verificationPending ? (
        <AuthForm
          fields={fields}
          screenLabel={{
            label: "Email",
            description: "Change email",
          }}
          buttonTitle="Change email"
          isLoading={isLoading}
          onSubmit={resetEmail}
        />
      ) : (
        <Verification
          isEmailVerification
          onVerify={(code: string) => verifyEmail(code)}
          title="Verify email"
          loading={isLoading}
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

export default EditEmail;
