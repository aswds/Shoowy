import { collection, doc } from "firebase/firestore";
import { db } from "../app/firebase";
import { getAuth } from "firebase/auth";
export function presetsReference() {
  const auth = getAuth();
  const presetsRef = collection(
    db,
    "users",
    `${auth.currentUser?.uid}`,
    "presets"
  );
  return presetsRef;
}

export function userRef() {
  const auth = getAuth();
  const userRef = doc(db, "users", `${auth.currentUser?.uid}`);
  return userRef;
}
