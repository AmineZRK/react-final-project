import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TopBar = ({ currentScreen }) => {
  return (
    <View style={styles.container}>
      <Text>{currentScreen}</Text>
      <TextInput placeholder="Search" style={styles.searchInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: '70%',
  },
});

export default TopBar;
