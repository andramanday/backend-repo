import dotenv from 'dotenv'
import firebase, { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

dotenv.config()

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

  // Initialize Firebase App (Client-Side)
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
