import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Picker, PickerIOS } from '@react-native-picker/picker';

import ProductService from '../../firebase/services/ProductService';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const [imageURL, setImageURL] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://172.17.0.1:5000/api/v1/category/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        data.map((d)=>{
          console.log(d.name);
       })
        setCategories(data); // Assuming data is an array of category objects
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    };
  
    fetchCategories();
  }, []);

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
          setImages([...images, result.assets[0].uri]);
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
      const imageUrls = [];
      // Validate form fields
      if (!name || !price || !description || !selectedCategory || images.length === 0) {
        alert('Please fill in all fields and select at least one image and category.');
        return;
      }
      const filename = `${Date.now()}.jpg`;
      const imageRef = ref(storage, 'images/' + filename);
      const res = await fetch(images);
      const blob = await res.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);

      console.log(imageURL);
      // Prepare the request body
      const productData = {
        title: name,
        price: parseFloat(price),
        description,
        categoryId: selectedCategory,
        images:imageUrls,
      };

      // Send a POST request to your API endpoint
      const response = await fetch('http://172.17.0.1:5000/api/v1/category/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      // Handle the response as needed
      // console.log(response);
      // Reset form fields
      setName('');
      setPrice('');
      setDescription('');
      setImages([]);
      setSelectedCategory('');
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
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        style={styles.sel}
      >
        {categories.map((category) => (
          <Picker.Item style={styles.pick} key={category._id} label={category.name} value={category._id} />
        ))}
      </Picker>

      {images && <Image source={{ uri: images[0] }} style={styles.image} />}
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
pick: {
fontSize: 12,
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
  sel: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default AddProductScreen;