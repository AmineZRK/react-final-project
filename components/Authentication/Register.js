// Register.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthService from '../../firebase/services/AuthService';
import CustomInput from '../Input/CustomInput';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

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
        isAdmin,
      };
      await AuthService.register(userData);
      // Navigate to home screen upon successful registration
      console.log(userData, ' goooood')
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <CustomInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <CustomInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <CustomInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
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
      <CustomInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <CustomInput
        placeholder="Birth Date"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Button title="Register" onPress={handleRegister} />
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

export default Register;
