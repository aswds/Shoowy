// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB2a8PWfuQKLGYFmykHeY9bPhW31HMuR2o",
  authDomain: "shoowy-c50a8.firebaseapp.com",
  projectId: "shoowy-c50a8",
  storageBucket: "shoowy-c50a8.appspot.com",
  messagingSenderId: "991668716663",
  appId: "1:991668716663:web:a469fc381f02933d3ab272",
  measurementId: "G-RY6X8SXDXC",
};

// Initialize Firebase

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);
