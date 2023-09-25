import { Feather } from "@expo/vector-icons";
import { Box, Text } from "@gluestack-ui/themed";
import { Stack, useRouter } from "expo-router";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { deletePresetsFromUser } from "../../api/db/presets/onDelete";
import SmallIconButton from "../../components/Button/SmallIconButton";
import Circle from "../../components/Circle/Circle";
import PresetBox from "../../components/InfoBox/PresetBox/PresetBox";
import EmptyList from "../../components/List/EmptyList";
import CustomModal from "../../components/Modal/CustomModal";
import BGBox from "../../components/Screen/BGBox";
import Colors from "../../constants/Colors";
import { useActions } from "../../hooks/useActions";
import useEventSubscription from "../../hooks/useSubscribeEvent";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { presetsReference, userRef } from "../../utils/docReference";

const MainPage = () => {
  const [pickedPreset, setPickedPreset] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [presetToDelete, setPresetToDelete] = useState<string>();
  const router = useRouter();
  const presetPicked = pickedPreset === 0 || pickedPreset;
  const { fetch_user } = useActions();
  const { isLoading, current_user, error } = useTypedSelector(
    (state) => state.user_state
  );
  const { presets } = current_user;
  // useEffect(() => {
  //   fetch_user();
  // }, []);

  useEventSubscription(() => onSnapshot(userRef(), fetch_user), []);
  useEventSubscription(() => onSnapshot(presetsReference(), fetch_user), []);
  return (
    <BGBox>
      <Spinner visible={isLoading} />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Circle
          isPresetPicked={presetPicked}
          pickedPreset={pickedPreset}
          presets={presets}
        />
        {/* <Box alignItems="center" justifyContent="space-evenly" flex={2}>
          <Title showLogo={false}>Let's Start</Title>
          <TouchableOpacity
            style={styles.circle}
            activeOpacity={0.8}
            onPress={() => {
              if (presetPicked) {
                const presetData = presets[pickedPreset];
                router.push({
                  pathname: "/(shower)/shower",
                  params: presetData,
                });
              }
            }}
          >
            {!presetPicked && (
              <Ionicons
                name="timer-outline"
                size={50}
                color={Colors.background}
              />
            )}
            <Text fontFamily="Bold" size="xl" color={Colors.background}>
              {presetPicked ? "Start" : "Pick a preset"}
            </Text>
          </TouchableOpacity>
        </Box> */}
        <Box flex={1} width={"100%"}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontFamily="Bold"
              size="2xl"
              color={Colors.accentColor}
              alignSelf="flex-start"
            >
              Presets
            </Text>

            <SmallIconButton
              label="Add preset"
              icon={
                <Feather name="plus" size={20} color={Colors.accentColor} />
              }
              onPress={() => {
                router.push("/presets");
              }}
            />
          </Box>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator
            data={presets}
            renderItem={({ item, index }) => (
              <PresetBox
                id={item.id}
                name={item.name}
                time={{
                  cold_time: item.cold_time,
                  warm_time: item.warm_time,
                  general_time: item.general_time,
                }}
                type={item.type}
                onPress={() => {
                  setPickedPreset(index);
                }}
                isSelected={pickedPreset === index}
                key={index}
                onDelete={() => {
                  setModalVisible(true);
                  setPresetToDelete(item.id);
                }}
              />
            )}
            style={{
              flex: 1,
              borderRadius: 20,
            }}
            contentContainerStyle={{
              paddingHorizontal: 5,
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 20,
              flexGrow: 1,
            }}
            ListEmptyComponent={
              <EmptyList
                text="Add some presets to get started!"
                icon={
                  <Feather
                    name="droplet"
                    size={24}
                    color={Colors.secondaryText}
                  />
                }
              />
            }
          />
        </Box>
        <CustomModal
          visible={modalVisible}
          title="Delete preset"
          text="Are you sure?"
          onSubmit={() => {
            deletePresetsFromUser(presetToDelete);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
          submitButtonText="Delete"
        />
      </SafeAreaView>
    </BGBox>
  );
};

export default MainPage;
