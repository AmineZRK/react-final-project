// components/Authentication/Register.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AuthService from '../../firebase/services/AuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await AuthService.register(email, password);
      // Navigate to home screen upon successful registration
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <View>
      <Text>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
