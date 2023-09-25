import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import CText from "../../Text/Text";
import { Time } from "../../TimePicker/types";
import WarmIcon from "../../Icons/WarmIcon";
import SnowIcon from "../../Icons/SnowIcon";
import Colors from "../../../constants/Colors";
import { calcTimeToString } from "../../../utils/formatSeconds";

const ContrastTime = ({
  warmTime,
  coldTime,
}: {
  coldTime: number;
  warmTime: number;
}) => {
  return (
    <Box justifyContent="center" gap={5}>
      {console.log(coldTime, warmTime)}
      <CText fontFamily="B" color={Colors.cold} size="sm">
        Cold <SnowIcon size={20} />:{" "}
        <CText fontFamily="M" size="sm">
          {calcTimeToString(coldTime)}
        </CText>
      </CText>
      <CText fontFamily="B" color={Colors.hot} size="sm">
        Warm <WarmIcon size={20} />:{" "}
        <CText fontFamily="M" size="sm">
          {calcTimeToString(warmTime)}
        </CText>
      </CText>
    </Box>
  );
};

export default ContrastTime;

const styles = StyleSheet.create({});
