import { collection, addDoc, getFirestore, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import app from '../config'; // Assuming your Firebase app configuration is exported from this file

const firestore = getFirestore(app);

class ProductService {
  static async addProduct(productData) {
    try {
      const productRef = await addDoc(collection(firestore, 'products'), productData);
      return productRef.id; // Return the ID of the newly added product
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const productDoc = await doc(firestore, 'products', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(productId, updatedProductData) {
    try {
      const productRef = doc(firestore, 'products', productId);
      await updateDoc(productRef, updatedProductData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      const productRef = doc(firestore, 'products', productId);
      await deleteDoc(productRef);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
