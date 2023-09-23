import { Box } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { ShowerType, TimeType } from "../../../types/Types";
import CText from "../../Text/Text";
import PresetInfo from "./PresetInfo";

interface PresetBoxProps {
  type: ShowerType;
  time: TimeType;
  name: string;
  onPress: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

const PresetBox: React.FC<PresetBoxProps> = ({
  time,
  type,
  name,
  onPress,
  isSelected,
  onDelete,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{}}>
      <Box
        bgColor={Colors.card}
        borderRadius={20}
        padding={20}
        style={{
          borderWidth: 2,
          borderColor: isSelected ? Colors.accentColor : Colors.card,
        }}
        height={"90%"}
        justifyContent={type !== "Contrast" ? "space-between" : "space-evenly"}
      >
        <PresetInfo name={name} time={time} type={type} />
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(230, 10, 10, 0.65)",
            height: 30,
            borderRadius: 10,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onDelete}
        >
          <CText fontFamily="B" size="sm" color={Colors.background}>
            Delete
          </CText>
        </TouchableOpacity>
      </Box>
    </TouchableOpacity>
  );
};

export default PresetBox;

const styles = StyleSheet.create({});
