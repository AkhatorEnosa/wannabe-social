// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLpGn1wxYeNFiGDYCCjLu2I2JsKzPM1Y0",
  authDomain: "wannabe-social.firebaseapp.com",
  projectId: "wannabe-social",
  storageBucket: "wannabe-social.appspot.com",
  messagingSenderId: "483593535683",
  appId: "1:483593535683:web:1537e5189430c4c4d3e276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const database = getFirestore(app )