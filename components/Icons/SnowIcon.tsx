import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export const SnowIcon = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => (
  <Ionicons name="ios-snow" size={size ?? 35} color={color ?? Colors.cold} />
);

export default SnowIcon;
