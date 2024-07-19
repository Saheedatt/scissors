import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

export function useFirebase() {
  const shortenUrl = async (url: string) => {
    const shortenedId = nanoid(10);
    const scissorsDomain = "https://scissors-14267.web.app";
    const shortenedUrl = `${scissorsDomain}/${shortenedId}`;
    try {
      const docRef = await addDoc(collection(db, "shortenedUrls"), {
        originalUrl: url,
        shortenedUrl: shortenedUrl,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      return shortenedUrl;
    } catch (event) {
      console.error("Error adding document: ", event);
      throw event;
    }
  };

  return { shortenUrl };
}

