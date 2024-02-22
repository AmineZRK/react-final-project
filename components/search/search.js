import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = width - 30;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const searchProducts = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:5000/api/v1/products/search/query?name=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    >
      <View style={styles.productItem}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        onChangeText={(text) => {
          setSearchTerm(text);
          searchProducts();
        }}
        value={searchTerm}
      />
      <FlatList
        data={searchResults}
        renderItem={renderProductItem}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  items: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: cardWidth,
  },
  productImage: {
    height: 170,
    borderRadius: 8,
    maxWidth: cardWidth,
  },
  productTitle: {
    marginTop: 5,
    textAlign: 'center',
    maxWidth: cardWidth - 20,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default Search;
