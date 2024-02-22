import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { useCart } from '../Cart/CartContext'; 

const CustomHeader = ({ navigation }) => {
  const { cartItems } = useCart(); 

  console.log("in top, cartCount:", cartItems.length);

  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.title}>My Store</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name='shopping-cart' type='font-awesome' color='#fff' />
        <Badge value={cartItems.length} status="error" containerStyle={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45,
    paddingHorizontal: 25,
    paddingBottom: 15,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});

export default CustomHeader;
