import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import CText from "../Text/Text";

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "30%",
        // shadowOpacity: 0.15,
        // shadowOffset: {
        //   height: 2,
        //   width: 0,
        // },
      }}
      onPress={onPress}
    >
      <CText fontFamily="M" color={Colors.hot} size="sm">
        logout
        {/* <Feather name="log-out" size={1} color="red" /> */}
      </CText>
      <AntDesign name="logout" size={20} color={Colors.hot} />
      {/* <View>
        <Feather name="log-out" size={24} color="red" />
      </View> */}
    </TouchableOpacity>
  );
};
export default LogoutButton;
