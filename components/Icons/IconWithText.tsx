import React from "react";
import { View, Text } from "react-native";
import SnowIcon from "./SnowIcon"; // Import your SnowIcon component here
import WarmIcon from "./WarmIcon";
import CText from "../Text/Text";
import { ShowerType } from "../../types/Types";
import { Box } from "@gluestack-ui/themed";

interface IconWithTextProps extends Required<React.PropsWithChildren> {
  type: ShowerType;
}

const IconWithText = ({ type, children }: IconWithTextProps) => {
  let content;
  const iconSize = 20;
  if (type === "Contrast") {
    content = (
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <WarmIcon size={iconSize} />
        <SnowIcon size={iconSize} />
      </View>
    );
  } else if (type === "Cold") {
    content = (
      <View>
        <SnowIcon size={iconSize} />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box flexDirection="row" gap={5}>
        <CText fontFamily={"B"}>{type}</CText>
        {content}
      </Box>

      {children}
    </View>
  );
};

export default IconWithText;
