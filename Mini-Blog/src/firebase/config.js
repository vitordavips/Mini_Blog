// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmz3uDOknGf4Ljp8gCd6RG1FkKNHn2HA",
  authDomain: "miniblog-35f8d.firebaseapp.com",
  projectId: "miniblog-35f8d",
  storageBucket: "miniblog-35f8d.appspot.com",
  messagingSenderId: "388072132896",
  appId: "1:388072132896:web:6ad075949a86ff8a674745"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };