import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const AuthPage = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('login');

  const handleSwitchChange = (value) => {
    setActiveButton(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchOption, activeButton === 'login' && styles.activeOption]}
          onPress={() => handleSwitchChange('login')}>
          <Text style={styles.optionText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchOption, activeButton === 'register' && styles.activeOption]}
          onPress={() => handleSwitchChange('register')}>
          <Text style={styles.optionText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {activeButton === 'login' ? <Login navigation={navigation} /> : <Register />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeOption: {
    backgroundColor: '#ddd',
  },
  optionText: {
    color: '#fff',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },}
});

export default AuthPage;
