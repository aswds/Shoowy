import { useFonts } from "expo-font";
const path = "../assets/fonts/Raleway/static/";

const Fonts: { [key: string]: NodeRequire } = {
  Regular: require(path + "Raleway-Regular.ttf"),
  Medium: require(path + "Raleway-Medium.ttf"),
  Bold: require(path + "Raleway-Bold.ttf"),
};

export function useLoadFonts() {
  //@ts-ignore
  const [isLoaded, error] = useFonts(Fonts);

  return { isLoaded, error };
}
