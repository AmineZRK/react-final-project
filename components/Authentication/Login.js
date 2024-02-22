// Login.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthService from '../../firebase/services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import CustomInput from '../Input/CustomInput';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const uid = await AuthService.login(email, password);
      const userData = await AuthService.getUserData(uid);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log(userData.isAdmin)
      if (userData.isAdmin) {
        navigation.navigate('AdminScreen'); // Navigate to the Admin screen
      } else {
        navigation.navigate('MainNavigator'); // Navigate to the main navigator
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Login;
