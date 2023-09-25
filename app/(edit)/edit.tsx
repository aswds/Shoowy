import { useUser } from "@clerk/clerk-expo";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Center,
  Image,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { iconColor, iconSize } from "../(auth)/constans";
import CustomInput from "../../components/Input/Input";
import BGBox from "../../components/Screen/BGBox";
import CText from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import { formatEmail } from "../../utils/formatEmail";
import * as FileSystem from "expo-file-system";
import UserImage from "../../components/User/Image";
const Edit = () => {
  const { isLoaded, user } = useUser();
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(
    user?.emailAddresses[0].emailAddress
  );
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const uploadImage = async () => {
    try {
      // const response = await axios.post(
      //   `https://polished-chipmunk-36.clerk.accounts.dev/v1/user_2V7UwiFHzmGebN4x5MaSWrT1ZUH/profile_image`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      await user?.setProfileImage({ file: image.base64 });
      // Handle the response from the server
    } catch (error) {
      // Handle any errors that occur during the upload
      console.error("Error uploading image", error.errors);
    }
  };

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
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);

      // formData.append(
      //   "file",
      //   JSON.stringify({
      //     uri: result.assets[0].uri,
      //     type: result.assets[0].type, // Adjust the type as needed
      //     name: result.assets[0].fileName,
      //   })
      // );
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
                  if (image) await uploadImage();
                  // router.back();
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
            <UserImage />
          </Box>

          {/* <TouchableOpacity onPress={pickImage}>
            <CText fontFamily={"M"} size="sm" color={Colors.accentColor}>
              Update picture
              <Feather name="edit-2" size={13} color={Colors.accentColor} />
            </CText>
          </TouchableOpacity> */}
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
