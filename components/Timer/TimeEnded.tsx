import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Box } from "@gluestack-ui/themed";
import BGBox from "../Screen/BGBox";
import CText from "../Text/Text";
import CustomButton from "../Button/CustomButton";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { addShowerDurationToHistory } from "../../api/db/history/onAdd";

const TimeEnded = ({
  time,
  onAddHistory,
}: {
  time: string;
  onAddHistory: () => void;
}) => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(onAddHistory);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Box height={"100%"} alignItems="center" justifyContent="center">
      <Box
        alignItems="center"
        justifyContent="space-evenly"
        backgroundColor="rgba(255,255,255,0.7)"
        borderRadius={50}
        height={"35%"}
        width={"100%"}
      >
        <Box alignItems="center" justifyContent="space-evenly" flex={1}>
          <CText fontFamily="B" size="2xl">
            Congratulations 🎉
          </CText>
          <CText fontFamily="M" size="md">
            Time you were showering is {time}
          </CText>
        </Box>

        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          width={"100%"}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/main");
            }}
            style={{
              backgroundColor: Colors.card,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              width: "70%",
            }}
          >
            <CText fontFamily="B" size="lg">
              Continue
            </CText>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default TimeEnded;

const styles = StyleSheet.create({});
