import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDhFR2WObxCKDWsNzerktfMOJV7OvSTA-M",
  authDomain: "scissors-14267.firebaseapp.com",
  projectId: "scissors-14267",
  storageBucket: "scissors-14267.appspot.com",
  messagingSenderId: "854032853312",
  appId: "1:854032853312:web:f26d3a6b9d698c505172a5",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };

//FirebaseError: Firebase: Error (auth/invalid-api-key).
//Getting the above error for using import.meta.env
//I diasabled ad blocker in my browsers and it still returned errors

// apiKey: import.meta.env.FIREBASE_API_KEY,
// authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
// projectId: import.meta.env.FIREBASE_PROJECT_ID,
// storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
// appId: import.meta.env.FIREBASE_APP_ID,

// firebaseConfig.ts:14
// Uncaught ReferenceError: process is not defined
// at firebaseConfig.ts:14:13
//GETTING THIS ERROR FOR USING PROCESS

//   apiKey: process.env.FIREBASE_API_KEY,
// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// projectId: process.env.FIREBASE_PROJECT_ID,
// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.FIREBASE_APP_ID,
