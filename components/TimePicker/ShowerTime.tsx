import { Box, Center } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CText from "../Text/Text";
import { Time } from "./types";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";

interface RepeatCounterProps {
  onRepeatChange: (repeats: number) => void;
  coldShowerTime: Time;
  hotShowerTime: Time;
}

const RepeatCounter: React.FC<RepeatCounterProps> = ({
  coldShowerTime,
  hotShowerTime,
  onRepeatChange,
}) => {
  const iconSize = 30;
  const [count, setCount] = useState(1);
  const [generalTime, setGeneralTime] = useState("");
  const onRepeatChangeHandle = (num: number) => {
    onRepeatChange(num);
    setCount(num);
    calcGeneralTime();
  };

  const incrementCount = () => {
    onRepeatChangeHandle(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      onRepeatChangeHandle(count - 1);
    }
  };
  useEffect(() => {
    calcGeneralTime();
  });
  function calcGeneralTime() {
    const coldShowerSec = coldShowerTime.minutes * 60 + coldShowerTime.seconds;
    const hotShowerSec = hotShowerTime.minutes * 60 + hotShowerTime.seconds;
    const time = (coldShowerSec + hotShowerSec) * count;
    const calcTime = `${Math.floor(time / 60)} min ${time % 60} sec`;

    setGeneralTime(calcTime);
  }

  return (
    <Box
      width={"100%"}
      mb={"15%"}
      paddingVertical={20}
      borderRadius={30}
      shadowOpacity={0.2}
      shadowOffset={{
        height: 2,
        width: 0,
      }}
      backgroundColor={Colors.card}
    >
      <Center>
        <CText fontFamily="B" size="2xl">
          Repeats
        </CText>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={decrementCount}>
            <View style={styles.button}>
              <Entypo name="minus" size={iconSize} color="black" />
            </View>
          </TouchableOpacity>

          <View style={styles.count}>
            <CText fontFamily="B" width={40} textAlign="center">
              {count}
            </CText>
          </View>

          <TouchableOpacity onPress={incrementCount}>
            <View style={styles.button}>
              <Entypo name="plus" size={iconSize} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <CText fontFamily="M">General time: {generalTime}</CText>
      </Center>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    padding: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  count: {
    backgroundColor: Colors.background,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  countText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  generalTime: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default RepeatCounter;
