import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl5ZyQgnLMtGL6iTUiF6SxMIOWMlPu89E",
  authDomain: "yureitv-8fded.firebaseapp.com",
  databaseURL:
    "https://yureitv-8fded-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yureitv-8fded",
  storageBucket: "yureitv-8fded.appspot.com",
  messagingSenderId: "22772155926",
  appId: "1:22772155926:web:9018150d7f47507dd2d737",
  measurementId: "G-QS82G5D5B8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default getFirestore(app);
