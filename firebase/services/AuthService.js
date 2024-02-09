import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getFirestore,getDoc } from 'firebase/firestore'; // Update import statements
import app from '../config';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const auth = getAuth(app);
const firestore = getFirestore(app);

class AuthService {
  static async register(userData) {
    try {
      const { email, password, firstName, lastName, phoneNumber, birthDate } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const userRef = doc(firestore, 'users', userCredential.user.uid); // Reference to user document
      const additionalData = {
        email,
        firstName,
        lastName,
        phoneNumber,
        birthDate,
      };

      await setDoc(userRef, additionalData); // Set user data in Firestore

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user.uid;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Stop listening for changes
        resolve(user);
      }, reject);
    });
  }

  static async getUserData(uid) {
    try {
      const userDocRef = doc(firestore, 'users', uid); 
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Store user data in AsyncStorage
        return userData;
      } else {
        throw new Error('User document does not exist');
      }
    } catch (error) {
      throw error;
    }
  }
  
  
}

export default AuthService;
