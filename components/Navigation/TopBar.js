import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { useCart } from '../Cart/CartContext'; 

const CustomHeader = ({ navigation }) => {
  const { cartItems } = useCart(); 

  console.log("in top, cartCount:", cartItems.length);

  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name='shopping-cart' type='font-awesome' color='blue' />
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
    backgroundColor: '#f0f8ff', // Marine Blue Color
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black Color
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width and height to make it round
  },
});

export default CustomHeader;
