import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC1O5qFr99wDE-TRfl8tfhPoLue-EeqM8A",
  authDomain: "chatapp-d4b09.firebaseapp.com",
  projectId: "chatapp-d4b09",
  storageBucket: "chatapp-d4b09.appspot.com",
  messagingSenderId: "1038554300513",
  appId: "1:1038554300513:web:169ee9c1e8e448de11aa20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const Provider=new GoogleAuthProvider()
export const db=getFirestore(app)
