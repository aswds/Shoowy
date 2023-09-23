import { useState } from "react";
import BGBox from "../components/Screen/BGBox";
import CustomInput from "../components/Input/Input";
import Title from "../components/Title/Title";
import { Button } from "@gluestack-ui/themed";
import CustomButton from "../components/Button/CustomButton";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { iconSize, iconColor } from "../app/(auth)/constans";
import Spinner from "react-native-loading-spinner-overlay";

interface VerificationProps {
  title: string;
  onVerify: (code: string, password: string) => void;
  loading?: boolean;
  isEmailVerification: boolean;
}

const Verification = ({
  onVerify,
  title,
  loading,
  isEmailVerification,
}: VerificationProps) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState<string>();
  return (
    <BGBox justifyContent="space-evenly" alignItems="center">
      <Spinner visible={loading} />
      <Title description="We have sent you a code" showLogo>
        {title}
      </Title>

      <CustomInput
        label="Verification Code"
        placeholder="Enter your verification code"
        onChangeText={(code: string) => {
          setVerificationCode(code);
        }}
        icon={<Entypo name="check" size={24} color={Colors.secondaryText} />}
        keyboardType="decimal-pad"
        maxLength={6}
      />
      {!isEmailVerification && (
        <CustomInput
          label="New password"
          placeholder="Enter your new password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          icon={<AntDesign name="eyeo" size={iconSize} color={iconColor} />}
        />
      )}
      <CustomButton
        label={"Submit"}
        onPress={() => onVerify(verificationCode, password)}
      />
    </BGBox>
  );
};

export default Verification;
