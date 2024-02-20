import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import ProductService from '../../firebase/services/ProductService';

const DeleteProductScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products when the component mounts
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productList = await ProductService.getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);
      // Reload products after deletion
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const confirmDelete = (productId) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteProduct(productId) },
      ],
      { cancelable: true }
    );
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default DeleteProductScreen;
