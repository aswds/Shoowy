import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { images } from "../../assets/images/images";
import Colors from "../../constants/Colors";

interface TitleProps extends React.PropsWithChildren {
  description?: string;
  showLogo: boolean;
}

const Title = (props: TitleProps) => {
  return (
    <Box alignItems="center" justifyContent="flex-start" width={"100%"}>
      <Box
        alignItems="center"
        justifyContent="flex-start"
        width={"100%"}
        flexDirection="row"
      >
        <Text fontFamily="Bold" size="4xl" color={Colors.accentColor}>
          {props.children}
        </Text>
        {props.showLogo ? (
          <Box
            height={60}
            aspectRatio={1}
            justifyContent="center"
            alignContent="center"
            ml={20}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.image}
            />
          </Box>
        ) : null}
      </Box>
      <Text
        fontFamily="Bold"
        color={Colors.secondaryText}
        alignSelf="flex-start"
      >
        {props.description}
      </Text>
    </Box>
  );
};

export default Title;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
