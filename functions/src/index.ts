import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const scissorsDomain = "https://scissors-14267.web.app";

export const redirect = functions.https.onRequest(async (req, res) => {
  try {
    // Extract the short ID from the path
    const shortId = req.path.split("/").pop();
    if (!shortId) {
      res.status(400).send("No short ID provided.");
      return;
    }

    // Fetch the saved url from Firestore
    const doc = await db.collection("new-urls").doc(shortId).get();
    if (!doc.exists) {
      res.status(404).send("URL not found.");
      return;
    }

    // we need to check that the original URL exists in the document
    const docData = doc.data();
    if (!docData || !docData.originalUrl) {
      res.status(404).send("URL not found.");
      return;
    }

    // redirect to the original URL onClick
    const { originalUrl } = docData;
    res.redirect(originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).send("Internal Server Error");
  }
});
