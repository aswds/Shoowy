import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { extendedConfig } from "../extendedConfig";
import { useLoadFonts } from "../hooks/useLoadFonts";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (err) {
      return null;
    }
  },
};
async function getFirstLaunch() {
  const isFirstLaunch = await AsyncStorage.getItem("firstLaunch");
  return isFirstLaunch;
}
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { error, isLoaded: isFontLoaded } = useLoadFonts();
  useEffect(() => {
    async function initializeScreen() {
      if (!isLoaded || !isFontLoaded) return;
      const isFirstLaunch = await getFirstLaunch();
      const isTabsGroup = segments[0] === "(auth)";
      if (!isFirstLaunch) {
        router.replace("/initial_screen");
      } else if (isSignedIn && !isTabsGroup) {
        router.replace("/home");
      } else if (!isSignedIn) {
        router.replace("/login");
      }
    }
    initializeScreen();
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GluestackUIProvider config={extendedConfig}>
        <InitialLayout />
      </GluestackUIProvider>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
