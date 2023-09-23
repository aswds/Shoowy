import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Box, Button, Input, Text } from "@gluestack-ui/themed";
import IconBox from "../../components/InfoBox/IconBox";
import BGBox from "../../components/Screen/BGBox";
import Colors from "../../constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomButton from "../../components/Button/CustomButton";
import Title from "../../components/Title/Title";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import TimePicker from "../../components/TimePicker/TimePicker";
import CustomInput from "../../components/Input/Input";
import ShowerTimer from "../../components/TimePicker/ShowerTime";
import SnowIcon from "../../components/Icons/SnowIcon";
import WarmIcon from "../../components/Icons/WarmIcon";
import { Time } from "../../components/TimePicker/types";
import { createUserPreset } from "../../api/db/presets/onCreate";
import { ShowerType } from "../../types/Types";
import CustomModal from "../../components/Modal/CustomModal";
import { nanoid } from "@reduxjs/toolkit";
const Presets = () => {
  const [showerType, setShowerType] = useState<ShowerType>("Cold");
  const [cold_time, setCold_Time] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });
  const [warm_time, setWarm_Time] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });
  const [presetName, setPresetName] = useState<string>("");
  const [repeats, setRepeats] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const pickerRef = useRef();
  const handleSetColdTime = (fieldName: string, value: string) => {
    setCold_Time({ ...cold_time, [fieldName]: parseInt(value) });
  };
  const handleSetWarmTime = (fieldName: string, value: string) => {
    setWarm_Time({ ...warm_time, [fieldName]: parseInt(value) });
  };
  function formatTimeForPreset(time: Time) {
    return time.minutes * 60 + time.seconds;
  }
  async function addPreset() {
    const cold_time_seconds = formatTimeForPreset(cold_time);
    const warm_time_seconds = formatTimeForPreset(warm_time);
    if (
      presetName &&
      // Cold shower with positive cold time
      ((showerType === "Cold" && cold_time_seconds > 0) ||
        // Contrast shower with positive cold and warm times
        (showerType === "Contrast" &&
          cold_time_seconds > 0 &&
          warm_time_seconds > 0))
    ) {
      await createUserPreset({
        name: presetName,
        type: showerType,
        cold_time: cold_time_seconds,
        warm_time: warm_time_seconds,
        general_time: (cold_time_seconds + warm_time_seconds) * repeats,
        id: nanoid(),
      }).then(() => router.back());
    } else {
      setModalVisible(true);
    }
  }

  const insets = useSafeAreaInsets();
  return (
    <BGBox
      justifyContent="center"
      isKeyboardAvoidingViewDisabled
      paddingBottom={insets.bottom}
      paddingTop={50}
    >
      <Box
        flexDirection="column"
        width={"100%"}
        flex={1}
        alignItems="flex-start"
      >
        <Box style={styles.subContainerStyle} width={"100%"}>
          <Title showLogo={false}>Enter a name</Title>
          <CustomInput
            label={"Preset name"}
            placeholder="Enter preset name"
            onChangeText={setPresetName}
            maxLength={32}
          />
        </Box>
        <Title showLogo={false}>Select type</Title>

        <Box flexDirection="row" gap={20} style={styles.subContainerStyle}>
          <IconBox
            title="Cold"
            icon={<SnowIcon size={35} />}
            isPicked={showerType === "Cold"}
            onPress={() => {
              setShowerType("Cold");
            }}
          />
          <IconBox
            onPress={() => {
              setShowerType("Contrast");
            }}
            title="Contrast"
            isPicked={showerType === "Contrast"}
            icon={
              <Box
                flexDirection="row"
                width={"70%"}
                justifyContent="space-evenly"
              >
                <WarmIcon />
                <SnowIcon />
              </Box>
            }
          />
        </Box>
        <Box
          paddingHorizontal={5}
          width={"100%"}
          gap={20}
          style={styles.subContainerStyle}
        >
          <Title showLogo={false}>Select time</Title>

          <TimePicker handleSetTime={handleSetColdTime} label="Cold" />

          {showerType === "Contrast" ? (
            <TimePicker handleSetTime={handleSetWarmTime} label="Warm" />
          ) : null}
        </Box>
        {showerType === "Contrast" && (
          <ShowerTimer
            coldShowerTime={cold_time}
            hotShowerTime={warm_time}
            onRepeatChange={setRepeats}
          />
        )}
      </Box>
      <CustomModal
        visible={modalVisible}
        text="Please enter all data."
        title="Error"
        onSubmit={() => {
          setModalVisible(false);
        }}
      />
      <CustomButton label="Create" onPress={addPreset} />
    </BGBox>
  );
};

export default Presets;

const styles = StyleSheet.create({
  subContainerStyle: {
    marginBottom: "10%",
  },
});
