import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';;

const firebaseConfig = {
  apiKey: "AIzaSyDqLlqvx9TjrUJBMa91LfpvhKdBg-nf_qQ",
  authDomain: "cube-chat-340623.firebaseapp.com",
  projectId: "cube-chat-340623",
  storageBucket: "cube-chat-340623.appspot.com",
  messagingSenderId: "914366167675",
  appId: "1:914366167675:web:ef2ad257a2af96ab7280de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };