import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import validator from "validator";

admin.initializeApp();
const db = admin.firestore();

export const shortenUrl = functions.https.onCall(async (data, context) => {
  const { url } = data;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated."
    );
  }

  if (!validator.isURL(url)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid URL provided."
    );
  }

  const shortId = generateShortId();

  await db
    .collection("urls")
    .doc(shortId)
    .set({
      originalUrl: url,
      shortUrl: `https://scissors.com/${shortId}`,
      userId: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  return { shortenedUrl: `https://scissors.com/${shortId}` };
});

export const redirect = functions.https.onRequest(async (req, res) => {
  console.log("Incoming request:", req.path);
  const shortId = req.path.split("/")[1];
  console.log("Extracted shortId:", shortId);

  if (!shortId) {
    console.log("No shortId found in request path");
    res.status(400).send("Invalid short URL");
    return;
  }

  try {
    const doc = await db.collection("urls").doc(shortId).get();
    if (doc.exists) {
      const originalUrl = doc.data()?.originalUrl;
      console.log("Redirecting to:", originalUrl);
      res.redirect(301, originalUrl);
    } else {
      console.log("Short URL not found:", shortId);
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

function generateShortId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;
  let shortId = "";
  for (let i = 0; i < length; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortId;
}
