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

export async function addShowerDurationToHistory(preset: PresetType) {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const historyRef = collection(db, "users", `${userId}`, "history");

  const q = query(historyRef, orderBy("timestamp", "desc"));

  try {
    // Get the current user history
    const historyDoc = await getDocs(q);

    let historyData = [];

    if (!historyDoc.empty) {
      historyData = historyDoc.docs.map((doc) => doc.data());
    }

    // Add the new shower duration with a timestamp
    const timestamp = Timestamp.now();

    // Keep only the last 30 entries
    historyData.slice(100).map((doc) => {
      deleteDoc(doc.id);
    });

    // Update the user history in Firestore
    await addDoc(historyRef, { preset, timestamp, id: nanoid() });
  } catch (error) {
    console.error("Error adding shower duration to history:", error);
  }
}
