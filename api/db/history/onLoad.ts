import { nanoid } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDocs,
  Timestamp,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../app/firebase";
import { PresetType } from "../../../types/Preset";

export async function fetchHistory() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const historyRef = collection(db, "users", `${userId}`, "history");

  const q = query(historyRef, orderBy("timestamp", "desc"));

  try {
    // Get the current user history
    const historyDoc = await getDocs(q);

    const historyData = historyDoc.docs.map((doc) => doc.data());

    return historyData;
  } catch (error) {
    console.error("Error adding shower duration to history:", error);
  }
}
