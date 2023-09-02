import { StyleSheet, Image, View, ScrollView } from "react-native";
import React from "react";
import { Box, Button, ButtonText, Center, Text } from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
import BGBox from "../../components/Screen/BGBox";
import { images } from "../../assets/images/images";
import { Link, useRouter } from "expo-router";
import CustomButton from "../../components/Button/CustomButton";
const InitialScreen = () => {
  const router = useRouter();
  return (
    <BGBox
      height={"100%"}
      width={"100%"}
      alignItems="center"
      justifyContent="space-around"
    >
      <Box alignItems="flex-start" width={"100%"}>
        <Text fontFamily="Bold" size="5xl" color={Colors.light.accentColor}>
          Welcome to Shoowy 👋
        </Text>
        <Text color={Colors.light.secondaryText} mt={5} fontFamily="Medium">
          make your shower routine simpler
        </Text>
      </Box>

      <Center height={160} width={170}>
        <Image source={images.logo} style={styles.imageStyle} />
      </Center>
      <Box width={"100%"} alignItems="center">
        <CustomButton
          label="Log in"
          onPress={() => {
            router.push("/login");
          }}
        />
        <Text color={Colors.light.secondaryText} mt={10} fontFamily="Regular">
          New to Shoowy?{" "}
          <Link href={"/register"}>
            <Text color={Colors.light.accentColor} fontFamily={"Medium"}>
              Sign up
            </Text>
          </Link>
        </Text>
      </Box>
    </BGBox>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
