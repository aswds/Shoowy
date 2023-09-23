import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function WarmIcon({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <FontAwesome
      name="thermometer-4"
      size={size ?? 35}
      color={color ?? Colors.hot}
    />
  );
}
