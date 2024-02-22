import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Badge } from 'react-native-elements';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.title}>Case Store</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name='shopping-cart' type='font-awesome' color='blue' />
        <Badge value={5} status="error" containerStyle={styles.badge} />
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
});

export default CustomHeader;
