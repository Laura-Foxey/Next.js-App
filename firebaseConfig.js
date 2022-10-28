import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBoYm7XF_bqHm0jxtjSPeoEHmoiQVdt104",
    authDomain: "text-nextjs-a6c3b.firebaseapp.com",
    projectId: "text-nextjs-a6c3b",
    storageBucket: "text-nextjs-a6c3b.appspot.com",
    messagingSenderId: "508916007397",
    appId: "1:508916007397:web:5f57ff425cf80a1621ef0c"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);