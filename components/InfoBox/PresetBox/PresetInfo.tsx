import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { calcTimeToString } from "../../../utils/formatSeconds";
import SnowIcon from "../../Icons/SnowIcon";
import WarmIcon from "../../Icons/WarmIcon";
import CText from "../../Text/Text";
import ContrastTime from "./ContrastTime";
import { ShowerType, TimeType } from "../../../types/Types";
import _ from "lodash";
interface PresetInfoProps {
  name: string;
  type: ShowerType;
  time: TimeType;
}

const PresetInfo: React.FC<PresetInfoProps> = ({ name, time, type }) => {
  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {name && (
          <CText fontFamily="B" maxWidth={"70%"} numberOfLines={1}>
            {name}
          </CText>
        )}

        {type === "Contrast" ? (
          <Box flexDirection="row" gap={5}>
            <WarmIcon size={20} />
            <SnowIcon size={20} />
          </Box>
        ) : (
          <SnowIcon size={20} />
        )}
      </Box>
      {type === "Contrast" && !_.isEmpty(time) && (
        <ContrastTime coldTime={time.cold_time} warmTime={time.warm_time} />
      )}
      <CText
        fontFamily="M"
        size="sm"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        Time{" "}
        <CText fontFamily={"M"}>
          <Ionicons name="time-outline" size={18} color={Colors.text} />:{" "}
        </CText>
        {!_.isEmpty(time) && calcTimeToString(time?.general_time)}
      </CText>
    </>
  );
};

export default PresetInfo;

const styles = StyleSheet.create({});
