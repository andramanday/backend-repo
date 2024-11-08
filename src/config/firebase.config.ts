import * as admin from 'firebase-admin';

import serviceAccount from "../879f2c227a.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const db = admin.firestore();

export default admin;