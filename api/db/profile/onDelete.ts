import { deleteUser, getAuth, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";
import { Alert } from "react-native";
import { FirebaseError } from "firebase/app";

async function deleteUserAuthenticationAndFirestoreData() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Reference to the user's Firestore document
      const userDocRef = doc(db, "users", user.uid);

      // Delete the Firestore document
      await deleteDoc(userDocRef);

      // Sign out the user
      await signOut(auth);

      // Delete the user's authentication
      await deleteUser(user);
    }
  } catch (error) {
    Alert.alert(
      "Oops!",
      `Something went wrong... \n${
        error instanceof FirebaseError ? error.message : ""
      }`
    );
  }
}
