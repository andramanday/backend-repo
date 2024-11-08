import dotenv from 'dotenv'
import firebase, { FirebaseOptions, initializeApp } from 'firebase/app'
import admin from 'firebase-admin'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

dotenv.config();

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
const app = initializeApp(firebaseConfig);

var serviceAccount = require("../879f2c227a.json");


const admins = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// firebase.initializeApp(firebaseConfig)
export const db = getFirestore(app); 
export const auth = getAuth();