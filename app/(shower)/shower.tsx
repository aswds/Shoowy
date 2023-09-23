import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomModal from "../../components/Modal/CustomModal";
import BGBox from "../../components/Screen/BGBox";
import CloseButton from "../../components/Timer/CloseButton";
import Stopwatch from "../../components/Timer/Stopwatch";
import Colors from "../../constants/Colors";
import { WarmColdShower } from "../../types/Types";
import { addShowerDurationToHistory } from "../../api/db/history/onAdd";

const Shower = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showerType, setShowerType] = useState<WarmColdShower>("Warm");
  function updateShowerType(showerType: WarmColdShower) {
    setShowerType(showerType);
  }
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <BGBox
      paddingTop={insets.top}
      backgroundColor={showerType === "Cold" ? Colors.cold : Colors.hot}
      flex={1}
    >
      <CloseButton
        onPress={() => {
          setShowModal(true);
        }}
        size={40}
        iconColor={Colors.background}
        style={{
          position: "absolute",
          right: 0,
          zIndex: 1,
        }}
      />

      <Stopwatch
        coldTime={params?.cold_time}
        warmTime={params?.warm_time}
        generalShowerTime={params?.general_time}
        updateShowerType={updateShowerType}
        onAddHistory={() => {
          addShowerDurationToHistory(params);
        }}
      />
      <CustomModal
        visible={showModal}
        title="Are you sure?"
        text="The results will be unsaved"
        onSubmit={() => {
          router.push("/(tabs)/main");
          setShowModal(false);
        }}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </BGBox>
  );
};

export default Shower;

const styles = StyleSheet.create({});
