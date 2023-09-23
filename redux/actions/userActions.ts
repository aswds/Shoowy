import { Alert } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { db } from "../../app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IUser } from "../slices/userSlice";
import { PresetType } from "../../types/Preset";
import { fetchHistory } from "../../api/db/history/onLoad";

export const fetch_user = createAsyncThunk(
  "fetch_user",
  async (): Promise<IUser> => {
    try {
      const auth = getAuth();
      const userPath = `users/${auth.currentUser?.uid}`;
      const userRef = doc(db, userPath);
      const userPresets = collection(db, userPath, "presets");
      const userData = (await getDoc(userRef)).data();
      const userPresetsData = (await getDocs(userPresets)).docs.map(
        (doc) => doc.data() as PresetType
      );
      const history = await fetchHistory();
      return {
        ...userData,
        presets: userPresetsData,
        history: history,
      };
    } catch (error: unknown) {
      Alert.alert("Oops...", "Something went wrong.");
    }
  }
);
