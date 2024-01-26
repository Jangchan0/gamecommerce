// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCDrToe9_lWi8zsOdBuwJnPeVU3-WUwUzI',
    authDomain: 'fir-geagul.firebaseapp.com',
    projectId: 'fir-geagul',
    storageBucket: 'fir-geagul.appspot.com',
    messagingSenderId: '878364303536',
    appId: '1:878364303536:web:e443d04b0a9dc8cc341b75',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
