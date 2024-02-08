// firebase/services/AuthService.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword and signInWithEmailAndPassword
import app from '../config';

const auth = getAuth(app);

class AuthService {
  // Register user with email and password
  static async register(userData) {
    try {
      const { email, password, firstName, lastName, phoneNumber, birthDate } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Additional user data to be stored in Firestore
      const additionalData = {
        firstName,
        lastName,
        phoneNumber,
        birthDate,
      };

      // Store additional data in Firestore
      await firestore.collection('users').doc(userCredential.user.uid).set(additionalData);

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Login user with email and password
  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Logout current user
  static async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
