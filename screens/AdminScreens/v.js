import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import app from '../../firebase/config'; // Import Firebase storage
import { getStorage, ref, storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductService from '../../firebase/services/ProductService';



const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const [imageURL, setImageURL] = useState('')
  const handleChooseImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        console.log('Image picker result:', result);
        if (result.assets && result.assets.length > 0) {
          setImage(result.assets[0].uri);
        } else {
          console.error('No image assets found in the result.');
        }
      }
    } catch (error) {
      console.error('Error choosing image:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!image) {
        alert('Please choose an image for the product.');
        return;
      }
  
          // Convert the price to a number
        const parsedPrice = parseFloat(price);

        // Check if the parsed price is a valid number
        if (isNaN(parsedPrice)) {
        alert('Please enter a valid price.');
        return;
        }
      
  
      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
  
      // Create a reference to the child location (directory) where you want to store the image
      const imageRef = ref(storage, 'images/' + filename);
      console.log('image reffff   ::', imageRef)
      // Upload the image to Firebase Storage
      const response = await fetch(image);
      console.log('my respose   :',response.blob);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageURL = await getDownloadURL(imageRef);
      setImageURL(imageURL);
      const productData = {
        name,
        price : parsedPrice,
        description,
        photoURL: imageURL,
      };
      ProductService.addProduct(productData);
    console.log('Product added successfully:', productData);
    setName('');
    setPrice();
    setDescription('');
    setImage(null);

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Add Product" onPress={handleAddProduct} disabled={!image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default AddProductScreen;

const handleChooseImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log('Image picker result:', result);
        if (result.assets && result.assets.length > 0) {
          // Append the new URI to the images array
          setImages([...images, result.assets[0].uri]);
        } else {
          console.error('No image assets found in the result.');
        }
      }
    } catch (error) {
      console.error('Error choosing image:', error);
    }
  };
  

