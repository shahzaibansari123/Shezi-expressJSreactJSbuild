import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDqJ-pzrO0n-Vgg7G1GLHCcibUJvIT9bu8",
    authDomain: "shezi-assignmentstopwatchjs.firebaseapp.com",
    projectId: "shezi-assignmentstopwatchjs",
    storageBucket: "shezi-assignmentstopwatchjs.appspot.com",
    messagingSenderId: "178263916037",
    appId: "1:178263916037:web:fd8e2dddb2c34b3a4ae66c"
  };
initializeApp(firebaseConfig)

export const db = getFirestore();