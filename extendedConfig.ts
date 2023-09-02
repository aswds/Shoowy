import {
  createConfig,
  config,
  GluestackUIProvider,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import Colors from "./constants/Colors";
export const extendedConfig = createConfig({
  ...config.theme,
  components: {
    Button: {
      theme: {
        variants: {
          variant: {
            ghost: {
              bg: "$transparent",
              _text: {
                color: "$primary600",
              },
              ":hover": {
                bg: "$primary200",
                _text: {
                  color: "$dark900",
                },
              },
              ":active": {
                bg: "$primary100",
              },
            },
          },
        },
      },
    },
  },
});
