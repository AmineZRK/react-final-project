// components/Authentication/Register.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../../firebase/services/AuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const navigation = useNavigation();

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
      
      // Navigate to the Profile page with user data after successful registration
      navigation.navigate('Profile', { userData });
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <View>
      <Text>Register</Text>
      {/* ... Other TextInput components ... */}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
