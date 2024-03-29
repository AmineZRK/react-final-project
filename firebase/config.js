import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

// Initialize Firebase Storage
const storage = getStorage(app);
  
export default app;
