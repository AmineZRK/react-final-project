// screens/AuthScreens/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AuthService from '../../firebase/services/AuthService';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      // Navigate to home screen upon successful login
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
