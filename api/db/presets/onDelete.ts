import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { FirebaseError } from "firebase/app";
import { userRef } from "../../../utils/docReference";
export async function deletePresetsFromUser(
  presetIdsToDelete: string | Array<string>
) {
  const auth = getAuth();

  // Reference to the presets subcollection
  try {
    console.log(presetIdsToDelete);
    if (typeof presetIdsToDelete === "string") {
      const presetsCollectionRef = doc(
        userRef(),
        "presets",
        `${presetIdsToDelete}`
      );

      await deleteDoc(presetsCollectionRef);
    } else {
      const presetsCollectionRef = doc(userRef(), "presets");

      for (const presetId of presetIdsToDelete) {
        const presetDocRef = doc(presetsCollectionRef, presetId);
        await deleteDoc(presetDocRef);
      }
    }
    // Reference to the user's Firestore document

    // Loop through the preset IDs to delete
  } catch (error) {
    Alert.alert(
      "Oops!",
      `Something went wrong... \n${
        error instanceof FirebaseError ? error.message : ""
      }`
    );
  }
}
