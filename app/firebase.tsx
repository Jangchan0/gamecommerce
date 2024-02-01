// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCDrToe9_lWi8zsOdBuwJnPeVU3-WUwUzI',
    authDomain: 'fir-geagul.firebaseapp.com',
    projectId: 'fir-geagul',
    storageBucket: 'fir-geagul.appspot.com',
    messagingSenderId: '878364303536',
    appId: '1:878364303536:web:e443d04b0a9dc8cc341b75',

    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
