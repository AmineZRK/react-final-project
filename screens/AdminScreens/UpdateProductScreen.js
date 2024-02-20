import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ProductService from '../../firebase/services/ProductService';

const UpdateProductScreen = ({ navigation }) => {
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

  const handleUpdateProduct = (productId) => {
    // Navigate to the product update screen with the productId
    navigation.navigate('ProductUpdate', { productId });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUpdateProduct(item.id)}>
      <View style={styles.productItem}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UpdateProductScreen;
