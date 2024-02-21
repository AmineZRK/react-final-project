import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductList from '../../components/ProductList/ProductList';
import CategoryList from '../../components/CategoriesList/CategoryList';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our Store</Text>
      <CategoryList selectedCategory={selectedCategory} handleCategoryPress={handleCategoryPress}/>
      <ProductList selectedCategory={selectedCategory}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff', // Marine Blue Color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Black Color
  },
});

export default HomeScreen;
