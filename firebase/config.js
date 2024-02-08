import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBD0V7MJCJWQywjFGsj9Frcbdtwa9UbSgw",
    authDomain: "react-expo-52df5.firebaseapp.com",
    projectId: "react-expo-52df5",
    storageBucket: "react-expo-52df5.appspot.com",
    messagingSenderId: "111665218769",
    appId: "1:111665218769:web:e499b4fe0249d46e1031f0",
    measurementId: "G-6F88ZXEFE1"
};

// Initialize Firebase only if it's not already initialized
const app = initializeApp(firebaseConfig);

export default app;
