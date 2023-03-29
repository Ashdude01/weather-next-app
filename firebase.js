
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCeU3_4kyxURO6I2thB2lk01I7o-zp4Eqg",
  authDomain: "iweather-3384b.firebaseapp.com",
  projectId: "iweather-3384b",
  storageBucket: "iweather-3384b.appspot.com",
  messagingSenderId: "901583855694",
  appId: "1:901583855694:web:f6eea7cea3f718e24ce31f",
  measurementId: "G-S5R6TSKZDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
