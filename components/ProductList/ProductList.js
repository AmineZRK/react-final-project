import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://172.17.0.1:5000/api/v1/products/'); //Replace by my IP address
        const products = await response.json();
        console.log(products);
       
        groupProductsByCategory(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    
  }, []); 
  const groupProductsByCategory = (products) => {
    const productsByCategoryMap = {};
    products.forEach((product) => {
      const category = product.category.name;
      if (!productsByCategoryMap[category]) {
        productsByCategoryMap[category] = [];
      }
      productsByCategoryMap[category].push(product);
    });
    setProductsByCategory(productsByCategoryMap);
  };
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}>
      <View style={styles.productItem}>
      {console.log('myyyyy   ',item.images[0])}
        <Image source={{ uri: item.images[0]}} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  ); 

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item}</Text>
      <FlatList
        data={productsByCategory[item]}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(productsByCategory)}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff', // Marine Blue Color
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', // Black Color
  },
  productItem: {
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 150,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Black Color
  },
  productPrice: {
    fontSize: 14,
    color: 'green', // color for price
  },
});

export default ProductList;
