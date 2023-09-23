import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { extendedConfig } from "../extendedConfig";
import { useLoadFonts } from "../hooks/useLoadFonts";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SafeAreaView } from "react-native";
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
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { error, isLoaded: isFontLoaded } = useLoadFonts();
  useEffect(() => {
    async function initializeScreen() {
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

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          // paddingHorizontal: 20,
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="(shower)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="index" />
    </Stack>
  );
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
