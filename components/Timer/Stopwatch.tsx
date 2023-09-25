import { Box } from "@gluestack-ui/themed";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { useInterval } from "../../hooks/useInterval";
import { useSound } from "../../hooks/useSound";
import { ShowerType, WarmColdShower } from "../../types/Types";
import SnowIcon from "../Icons/SnowIcon";
import WarmIcon from "../Icons/WarmIcon";
import CText from "../Text/Text";
import TimeEnded from "./TimeEnded";
import TimerButton from "./TimerButton";

interface StopwatchProps {
  coldTime: number;
  warmTime: number;
  generalShowerTime: number;
  showerType: ShowerType;
  updateShowerType: (showerType: WarmColdShower) => void;
  onAddHistory: () => void;
}

const Stopwatch = ({
  coldTime,
  warmTime,
  generalShowerTime,
  showerType,
  updateShowerType,
  onAddHistory,
}: StopwatchProps) => {
  const [isColdShower, setIsColdShower] = useState(
    showerType === "Cold" ? true : false
  );
  const [generalTime, setGeneralTime] = useState(generalShowerTime);
  const [coldShowerRemaining, setColdShowerRemaining] = useState(coldTime);
  const [warmShowerRemaining, setWarmShowerRemaining] = useState(warmTime);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const { playSound } = useSound();
  function updateShowerTypeHandle(isColdShower: boolean) {
    playSound();
    setIsColdShower(isColdShower);
    updateShowerType(isColdShower ? "Cold" : "Warm");
  }

  const updateTimers = () => {
    if (isColdShower) {
      if (coldShowerRemaining > 0) {
        setColdShowerRemaining((prev) => prev - 1);
      } else {
        // Cold shower time is over, switch to warm shower

        updateShowerTypeHandle(false);
        if (warmShowerRemaining > 0) {
          setWarmShowerRemaining((prev) => prev - 1);
        } else {
          setWarmShowerRemaining(warmTime);
        }
      }
    } else {
      if (warmShowerRemaining > 0) {
        setWarmShowerRemaining((prev) => prev - 1);
      } else {
        // Warm shower time is over, switch to cold shower
        updateShowerTypeHandle(true);

        if (coldShowerRemaining > 0) {
          setColdShowerRemaining((prev) => prev - 1);
        } else {
          setColdShowerRemaining(coldTime);
        }
      }
    }
    setGeneralTime((prev) => prev - 1);
  };
  const startTimer = () => {
    setIsPaused(false);
    setIsStarted(true);
  };
  const stopTimer = () => {
    setIsPaused(true);
  };
  useInterval(updateTimers, isPaused || generalTime <= 0 ? null : 1000);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  if (generalTime <= 0) {
    return (
      <TimeEnded
        time={formatTime(generalShowerTime)}
        onAddHistory={onAddHistory}
      />
    );
  }
  const iconSize = 180;
  const iconColor = "white";
  return (
    <Box alignItems="center" justifyContent="space-evenly" flex={1}>
      <Box
        backgroundColor={isColdShower ? Colors.cold : Colors.hot}
        alignItems="center"
        justifyContent="center"
      >
        <Box height={200} alignItems="center" justifyContent="center">
          {isColdShower ? (
            <SnowIcon color={iconColor} size={iconSize} />
          ) : (
            <WarmIcon color={iconColor} size={iconSize} />
          )}
        </Box>

        <CText fontFamily="B" size="6xl" color={"$white"}>
          {isColdShower
            ? formatTime(coldShowerRemaining)
            : formatTime(warmShowerRemaining)}
        </CText>
      </Box>
      <Box flexDirection="row" width={"100%"} justifyContent="space-around">
        <TimerButton
          buttonText={isPaused ? (isStarted ? "Continue" : "Start") : "Pause"}
          onPress={isPaused ? startTimer : stopTimer}
        />
      </Box>
      <Box alignItems="center">
        <CText color={iconColor} size="xl" fontFamily="M">
          Remaining time
        </CText>
        <CText color={iconColor} size="2xl" fontFamily="B">
          {formatTime(generalTime)}
        </CText>
      </Box>
    </Box>
  );
};

export default Stopwatch;
