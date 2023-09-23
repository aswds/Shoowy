import { ActivityIndicator, View } from "react-native";
import Colors from "../constants/Colors";
const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.accentColor} />
    </View>
  );
};

export default RootIndex;
