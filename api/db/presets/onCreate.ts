import { Alert } from "react-native";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../app/firebase";
import { getAuth } from "firebase/auth";
import { PresetType } from "../../../types/Preset";
import { FirebaseError } from "firebase/app";

export async function createUserPreset(preset: PresetType) {
  try {
    const auth = getAuth();
    const userRef = doc(
      db,
      "users",
      `${auth.currentUser?.uid}`,
      `presets`,
      preset.id
    );
    await setDoc(userRef, preset);
  } catch (error: unknown) {
    Alert.alert(
      "Oops!",
      `Something went wrong... \n${
        error instanceof FirebaseError ? error.message : ""
      }`
    );
  }
}
