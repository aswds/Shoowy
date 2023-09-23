import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import BGBox from "../../components/Screen/BGBox";
import Colors from "../../constants/Colors";
import Title from "../../components/Title/Title";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import InfoBox from "../../components/InfoBox/InfoBox";
import { Box } from "@gluestack-ui/themed";
import CustomButton from "../../components/Button/CustomButton";
import { useClerk } from "@clerk/clerk-expo";
import WideBar from "../../components/Information/WideBar";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { fetchHistory } from "../../api/db/history/onLoad";
import Spinner from "react-native-loading-spinner-overlay";
import PresetBox from "../../components/InfoBox/PresetBox/PresetBox";
import PresetInfo from "../../components/InfoBox/PresetBox/PresetInfo";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import moment from "moment";
// import { BarChart } from "react-native-gifted-charts";

const StatsPage = () => {
  const insets = useSafeAreaInsets();
  const { isLoading, current_user, error } = useTypedSelector(
    (state) => state.user_state
  );
  const { history } = current_user;
  return (
    <Box
      flex={1}
      paddingTop={insets.top}
      paddingHorizontal={20}
      backgroundColor={Colors.background}
    >
      <Spinner visible={isLoading} />
      <Box alignItems="flex-start">
        <Title showLogo={true}>Your History</Title>
      </Box>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const { cold_time, type, name, warm_time, general_time } =
            item.preset;
          return (
            <WideBar
              barTitle={moment(item.timestamp?.toDate().toString()).format(
                "lll"
              )}
            >
              <PresetInfo
                {...item.preset}
                time={{ cold_time, general_time, warm_time }}
              />
            </WideBar>
          );
        }}
        contentContainerStyle={{
          gap: 20,
          flexGrow: 1,
          justifyContent: "flex-start",
        }}
        style={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
        // columnWrapperStyle={{ justifyContent: "space-evenly", gap: 20 }}
      />

      {/* <CustomButton
          label="Hellow"
          onPress={async function (): void {
            await signOut();
          }}
        /> */}
    </Box>
  );
};

export default StatsPage;

const styles = StyleSheet.create({});
