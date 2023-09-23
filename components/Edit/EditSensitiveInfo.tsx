import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import CText from "../Text/Text";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

interface EditSensitiveInfo {
  label: string;
  onPress: () => void;
  info: string;
  isPassword: boolean;
}

const EditSensitiveInfo: React.FC<EditSensitiveInfo> = ({
  info,
  isPassword,
  label,
  onPress,
}) => {
  function formatEmail(email: string) {
    if (email.includes("@")) {
      const splitedEmail = email.split("@");
      const slicedEmail = splitedEmail[0].slice(0, 4);

      // sash@gmail.com
      return slicedEmail.concat("***", splitedEmail[1]);
    }
  }
  return (
    <Box flexDirection="column" mt={20}>
      <CText
        fontFamily={"M"}
        marginLeft={5}
        color={Colors.secondaryText}
        size="sm"
      >
        {label}
      </CText>

      <Box flexDirection="row" justifyContent="space-between">
        <CText fontFamily="M">
          {info && !isPassword ? formatEmail(info) : "******"}
        </CText>
        <TouchableOpacity onPress={onPress}>
          <CText fontFamily="M" color={Colors.hot}>
            edit <Feather name="edit-2" size={13} color={Colors.hot} />
          </CText>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default EditSensitiveInfo;

const styles = StyleSheet.create({});
