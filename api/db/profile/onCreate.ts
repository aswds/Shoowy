import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { FirebaseError } from "firebase/app";

async function createUser() {
  try {
    const auth = getAuth();
    const userRef = doc(db, "users", `${auth.currentUser?.uid}`);
    await setDoc(userRef, {});
  } catch (error) {
    Alert.alert(
      "Oops!",
      `Something went wrong... \n${
        error instanceof FirebaseError ? error.message : ""
      }`
    );
  }
}
