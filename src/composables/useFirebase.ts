import { User } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  increment,
} from "firebase/firestore";
import { customAlphabet } from "nanoid";
import validator from "validator";

export function useFirebase() {
  const shortenUrl = async (url: string, user: User, customName?: string) => {
    if (!user || !user.uid) {
      throw new Error("User not authenticated");
    }

    if (!validator.isURL(url)) {
      throw new Error("Invalid URL");
    }

    const nanoid = customAlphabet(
      "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    );
    const id = customName || nanoid(6);

    // const id = customName || customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")(6);

    try {
      const docRef = await addDoc(collection(db, "new-urls"), {
        shortUrl: id,
        originalUrl: url,
        createdAt: new Date(),
        userId: user.uid,
        clickCount: 0,
      });
      console.log("Document written with ID: ", docRef.id);
      return id;
    } catch (event) {
      console.error("Error adding document: ", event);
      throw event;
    }
  };

  const checkCustomNameAvailability = async (customName: string) => {
    const q = query(
      collection(db, "new-urls"),
      where("shortUrl", "==", customName)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const getOriginalUrl = async (shortCode: string) => {
    try {
      const q = query(
        collection(db, "new-urls"),
        where("shortUrl", "==", shortCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Short URL not found");
      }

      const doc = querySnapshot.docs[0];
      return doc.data().originalUrl;
    } catch (error) {
      console.error("Error retrieving original URL: ", error);
      throw error;
    }
  };

  const retrieveUserUrls = async (user: User) => {
    const q = query(
      collection(db, "new-urls"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const incrementClickCount = async (shortCode: string) => {
    try {
      const q = query(
        collection(db, "new-urls"),
        where("shortUrl", "==", shortCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Short URL not found");
      }

      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, {
        clickCount: increment(1),
      });
    } catch (error) {
      console.error("Error incrementing click count: ", error);
      throw error;
    }
  };

  return {
    shortenUrl,
    getOriginalUrl,
    retrieveUserUrls,
    incrementClickCount,
    checkCustomNameAvailability,
  };
}
