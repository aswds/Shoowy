import React, { ComponentProps } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
interface CustomInputProps extends ComponentProps<typeof TextInput> {
  placeholder: string;
  icon?: React.ReactNode;
  label: string;
  underInput?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  label,
  underInput,
  ...props
}) => {
  return (
    <Box
      alignItems="flex-start"
      justifyContent="center"
      borderColor={Colors.secondaryText}
      style={styles.outerContainer}
    >
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#B8B8B8"
          {...props}
        />
      </View>
      {underInput}
    </Box>
  );
};

const styles = StyleSheet.create({
  outerContainer: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B8B8B8",
    borderRadius: 15,
    height: 50,
    backgroundColor: Colors.input,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  input: {
    height: "100%",
    flex: 1, // Allow the input to take up available space
    fontFamily: "Medium",
    fontSize: 13,
  },
  label: {
    fontFamily: "Medium",
    textAlign: "center",
    marginVertical: 5,
    marginLeft: 5,
    color: "#B8B8B8",
  },
});

export default CustomInput;
