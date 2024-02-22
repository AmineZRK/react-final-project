// components/Authentication/Register.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AuthService from '../../firebase/services/AuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = async () => {
    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        birthDate,
      };
      await AuthService.register(userData);
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
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Birth Date"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
