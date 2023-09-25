import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { User } from "firebase/auth";
import { useUser } from "@clerk/clerk-expo";

const UserImage = () => {
  const { user } = useUser();
  return (
    <Avatar height={100} aspectRatio={1} borderRadius={999} overflow="hidden">
      <AvatarFallbackText>{user?.username}</AvatarFallbackText>
    </Avatar>
  );
};

export default UserImage;

const styles = StyleSheet.create({});
