import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { getApp } from "firebase/app";
import FirestoreService from "./FirestoreService";

class AuthService {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  authStateChanged(callback) {
    return onAuthStateChanged(this.auth, (credentials) => {
      callback(credentials);
    });
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      await FirestoreService.saveUser(userCredential.user.uid, userCredential);
      return {
        user: userCredential?.user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async signUp(email, password, userName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await updateProfile(this.auth.currentUser, { displayName: userName });
      await FirestoreService.saveUser(userCredential.user.uid, userCredential);
      return { user: userCredential?.user };
    } catch (error) {
      return { error };
    }
  }

  async signIn(email, password) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return { user: result?.user };
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        return { error: "Invalid email or password." };
      }
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(password) {
    try {
      const credentials = EmailAuthProvider.credential(
        this.auth.currentUser.email,
        password
      );
      const result = await reauthenticateWithCredential(
        this.auth.currentUser,
        credentials
      );
      await FirestoreService.deleteDocument(result.user.uid);
      await deleteUser(result.user);
      console.log("Account deleted");
      localStorage.removeItem("favorites");
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    await signOut(this.auth);
  }
}

export default new AuthService(getApp());
