import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import BGBox from "../../components/Screen/BGBox";
import Title from "../../components/Title/Title";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomInput from "../../components/Input/Input";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { iconColor, iconSize } from "../(auth)/constans";
import { useUser } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { Center, Pressable, Image, Box } from "@gluestack-ui/themed";
import CText from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import EditSensitiveInfo from "../../components/Edit/EditSensitiveInfo";
import { formatEmail } from "../../utils/formatEmail";
const Edit = () => {
  const { isLoaded, user } = useUser();
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(
    user?.emailAddresses[0].emailAddress
  );
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  async function uploadImage() {
    if (image) {
      const imageBlob = await fetch(image).then((image) => image.blob());
      await user?.setProfileImage({
        file: imageBlob,
      });
    }
  }
  function updateUsername() {
    if (username)
      user?.update({
        username: username,
      });
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!isLoaded) {
    return <Spinner visible />;
  }
  return (
    <BGBox
      isKeyboardAvoidingViewDisabled
      style={{
        paddingTop: insets.top,
      }}
    >
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  updateUsername();
                  await uploadImage();
                  router.back();
                }}
              >
                <CText fontFamily="M" color={Colors.accentColor}>
                  Save
                </CText>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Box width={"100%"} height={"20%"} mt={"5%"}>
        <Center>
          <Box shadowOpacity={0.3} shadowOffset={{ height: 2, width: 0 }}>
            <Image
              source={{ uri: image ?? user?.imageUrl }}
              height={100}
              aspectRatio={1}
              borderRadius={999}
              overflow="hidden"
            />
          </Box>

          <TouchableOpacity onPress={pickImage}>
            <CText fontFamily={"M"} size="sm" color={Colors.accentColor}>
              Update picture
              <Feather name="edit-2" size={13} color={Colors.accentColor} />
            </CText>
          </TouchableOpacity>
        </Center>
      </Box>
      <CustomInput
        label="Username"
        placeholder="Enter your username"
        onChangeText={setUsername}
        icon={<FontAwesome name="user-o" size={iconSize} color={iconColor} />}
        defaultValue={user?.username}
      />

      <CustomInput
        label="Edit email"
        placeholder="Enter your email"
        onChangeText={setUsername}
        icon={
          <Feather name="mail" size={iconSize} color={Colors.secondaryText} />
        }
        value={formatEmail(email)}
        editable={false}
        onTouchStart={() => {
          router.push("/(edit)/edit_email");
        }}
      />
      <CustomInput
        label="Change password"
        placeholder="Enter your email"
        onChangeText={setUsername}
        icon={
          <AntDesign name="eyeo" size={iconSize} color={Colors.secondaryText} />
        }
        value={"********"}
        editable={false}
        onTouchStart={() => {
          router.push("/(edit)/edit_password");
        }}
      />
      {/* <EditSensitiveInfo
        info={email}
        isPassword={false}
        label="Edit email"
        onPress={() => {}}
      /> */}
    </BGBox>
  );
};

export default Edit;

const styles = StyleSheet.create({});
