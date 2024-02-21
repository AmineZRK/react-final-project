import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Marine Blue Color
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#000', // Black Color
  },
});

export default BottomBar;
