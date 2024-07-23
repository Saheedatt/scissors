import { User } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { customAlphabet } from "nanoid";
import validator from "validator";

export function useFirebase() {
  const shortenUrl = async (url: string, user: User) => {
    if (!user || !user.uid) {
      throw new Error("User not authenticated");
    }
    
    if (!validator.isURL(url)) {
      throw new Error("Invalid URL");
    }

    // to ensure that short ids are easy to read and highlight i.e. base58.
    const nanoid = customAlphabet(
      "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    );
    const id = nanoid(6);
    try {
      const docRef = await addDoc(collection(db, "new-urls"), {
        shortUrl: id,
        originalUrl: url,
        createdAt: new Date(),
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      return id;
    } catch (event) {
      console.error("Error adding document: ", event);
      throw event;
    }
  };

  const getOriginalUrl = async (shortCode: string) => {
    try {
      const urlsRef = collection(db, "new-urls");
      const q = query(urlsRef, where("shortUrl", "==", shortCode));
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
    const urlsRef = collection(db, "new-urls");
    // todo: try to attach a user to created links.
    const q = query(
      urlsRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  return { shortenUrl, getOriginalUrl, retrieveUserUrls };
}
