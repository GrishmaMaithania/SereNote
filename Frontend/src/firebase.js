import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDf7jO6zyLhgK9GCzF1xkE9PfYLlymhwvI",
  authDomain: "musicwebsite-39ba3.firebaseapp.com",
  projectId: "musicwebsite-39ba3",
  storageBucket: "musicwebsite-39ba3.firebasestorage.app", 
  messagingSenderId: "127269311401",
  appId: "1:127269311401:web:d200eb1195530141ef2ab8",
  measurementId: "G-211LCLRTG7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();