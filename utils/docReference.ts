import { collection, doc } from "firebase/firestore";
import { db } from "../app/firebase";
import { getAuth } from "firebase/auth";
export function presetsReference() {
  const auth = getAuth();
  return collection(db, "users", `${auth.currentUser?.uid}`, "presets");
}

export function userRef() {
  const auth = getAuth();
  const userRef = doc(db, "users", `${auth.currentUser?.uid}`);
  return userRef;
}
