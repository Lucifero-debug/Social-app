import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxf_tV86hJEWIeKICWQHmm6ripnTCrTQ8",
    authDomain: "social-app-b3a82.firebaseapp.com",
    projectId: "social-app-b3a82",
    storageBucket: "social-app-b3a82.appspot.com",
    messagingSenderId: "627828778266",
    appId: "1:627828778266:web:626cf8d2b2e02f82bd78a3",
    measurementId: "G-LQBDVRFXD7"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider=new GoogleAuthProvider();

export const auth=getAuth();

export default app;