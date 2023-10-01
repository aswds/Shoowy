import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { extendedConfig } from "../extendedConfig";
import { useLoadFonts } from "../hooks/useLoadFonts";
import { store } from "../redux/store";
import Constants from "expo-constants";
const CLERK_PUBLISHABLE_KEY =
  "pk_test_cG9saXNoZWQtY2hpcG11bmstMzYuY2xlcmsuYWNjb3VudHMuZGV2JA";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { error, isLoaded: isFontLoaded } = useLoadFonts();
  useEffect(() => {
    function initializeScreen() {
      if (!isLoaded || !isFontLoaded) return;
      const isTabsGroup = segments[0] === "(tabs)";
      if (!isSignedIn) {
        router.replace("/initial_screen");
      } else if (isSignedIn && !isTabsGroup) {
        router.replace("/(tabs)/main");
      }
    }
    initializeScreen();
  }, [isSignedIn]);

  if (!isFontLoaded) return;
  return <Stack screenOptions={{ headerShown: false }} />;
};
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
const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <SafeAreaProvider>
        <GluestackUIProvider config={extendedConfig}>
          <Provider store={store}>
            <InitialLayout />
          </Provider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
