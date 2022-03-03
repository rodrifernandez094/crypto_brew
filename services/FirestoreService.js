import {
  updateDoc,
  getDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import db from "../firebase/firebase";

class FirestoreService {
  async saveUser(id, userCredential) {
    const ref = doc(db, "users", id);
    const docSnapshot = await getDoc(ref);
    if (!docSnapshot.exists()) {
      await setDoc(doc(db, "users", id), {
        userId: userCredential.user?.uid,
        userName: userCredential.user?.displayName,
        email: userCredential.user?.email,
        portfolio: [],
      });
    }
  }

  async addFavorite(userId, coinId, toggle) {
    const ref = doc(db, "users", userId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      if (!toggle) {
        await updateDoc(doc(db, "users", userId), {
          portfolio: arrayUnion({
            coinId,
          }),
        });
      }
      if (toggle) {
        await updateDoc(doc(db, "users", userId), {
          portfolio: arrayRemove({
            coinId,
          }),
        });
      }
    }
  }
  async getFavorites(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      localStorage.setItem("favorites", JSON.stringify(docData.portfolio));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
}

export default new FirestoreService();
