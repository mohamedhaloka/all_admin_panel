// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmiy3JLwXZWfSsxXNUt1uEO8SMTrqwP7Y",
    authDomain: "all-app-25be6.firebaseapp.com",
    projectId: "all-app-25be6",
    storageBucket: "all-app-25be6.appspot.com",
    messagingSenderId: "503850164446",
    appId: "1:503850164446:web:a0d8d6a66054e1d1fb624f",
    measurementId: "G-5CZX9VL4TR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
