import { useClerk, useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Center,
  Text,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import LogoutButton from "../../components/Button/LogoutButton";
import UserCalendar from "../../components/Calendar/Calendar";
import IconWithText from "../../components/Icons/IconWithText";
import WideBar from "../../components/Information/WideBar";
import CustomModal from "../../components/Modal/CustomModal";
import BGBox from "../../components/Screen/BGBox";
import CText from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { calcTimeToString } from "../../utils/formatSeconds";
export default function Profile() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const { history } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const [maxTime, setMaxTime] = useState<{
    cold?: number;
    contrast?: number;
  }>({
    cold: null,
    contrast: null,
  });
  function setMaxGeneralTime() {
    let maxColdGeneralTime = -Infinity;
    let maxContrastGeneralTime = -Infinity;
    for (const item of history) {
      if (item.preset.type === "Cold") {
        // Update maxColdGeneralTime for 'cold' type
        console.log(item.preset.general_time);
        maxColdGeneralTime = Math.max(
          maxColdGeneralTime,
          item.preset.general_time
        );
      } else if (item.preset.type === "Contrast") {
        // Update maxContrastGeneralTime for 'contrast' type
        maxContrastGeneralTime = Math.max(
          maxContrastGeneralTime,
          item.preset.general_time
        );
      }
    }
    return { cold: maxColdGeneralTime, contrast: maxContrastGeneralTime };
  }
  // Iterate through the array
  useEffect(() => {
    setMaxTime(setMaxGeneralTime());
  }, []);

  return (
    <BGBox>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-evenly" }}>
        <Spinner visible={!isLoaded} />
        <Box>
          <Center>
            <LogoutButton
              onPress={() => {
                setShowLogoutModal(true);
              }}
            />
            <Avatar h={100} aspectRatio={1} borderRadius={60}>
              <AvatarImage
                source={{ uri: user?.imageUrl }}
                onLoadEnd={() => {}}
              />
              <AvatarFallbackText>{user?.imageUrl}</AvatarFallbackText>
            </Avatar>
            <CText fontFamily="M" size="lg" color={Colors.accentColor}>
              {user?.username}
            </CText>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                router.push("/(edit)/edit");
              }}
            >
              <Text fontFamily="Medium" fontSize={"$sm"} color={Colors.hot}>
                Edit <Feather name="edit-2" size={13} color={Colors.hot} />
              </Text>
            </TouchableOpacity>
          </Center>
        </Box>
        <UserCalendar history={history} />
        <WideBar
          barTitle="Best results"
          barData=""
          barTitleProps={{
            size: "2xl",
          }}
        >
          <Box flexDirection="row" justifyContent="space-between">
            <FlatList
              horizontal
              data={[
                { type: "Cold", time: maxTime.cold },
                { type: "Contrast", time: maxTime.contrast },
              ]}
              renderItem={({ item, index }) => {
                return (
                  <IconWithText type={item.type} key={index}>
                    <CText fontFamily="B">
                      Time:
                      <CText fontFamily="M">
                        {calcTimeToString(item.time)}
                      </CText>
                    </CText>
                  </IconWithText>
                );
              }}
              contentContainerStyle={{ gap: 15 }}
              showsHorizontalScrollIndicator={false}
            />
          </Box>
        </WideBar>
        <CustomModal
          onSubmit={async () => {
            await signOut();
            setShowLogoutModal(false);
          }}
          title="Logout"
          text="Are you sure?"
          onClose={() => {
            setShowLogoutModal(false);
          }}
          visible={showLogoutModal}
          submitButtonText="Logout"
          submitButtonProps={{ backgroundColor: "$error300" }}
        />
      </SafeAreaView>
    </BGBox>
  );
}
