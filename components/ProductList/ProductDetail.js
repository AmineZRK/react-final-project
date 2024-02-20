import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.116:5000/api/v1/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const renderProductDetails = () => {
    if (!productDetails) {
      return <Text>Loading...</Text>;
    }

    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: productDetails.images[0] }} style={styles.productImage} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{productDetails.title}</Text>
          <Text style={styles.productPrice}>Price: ${productDetails.price}</Text>
          {productDetails.category.name === 'shoes' && <Text>Sizes: Add logic to display shoe sizes</Text>}
          {productDetails.category.name === 'cloths' && <Text>Sizes: Add logic to display clothing sizes</Text>}
          <Text>Description: {productDetails.description}</Text>
        </View>
      </ScrollView>
    );
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log('Product added to cart');
  };

  return (
    <View style={styles.container}>
      {renderProductDetails()}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetails;
