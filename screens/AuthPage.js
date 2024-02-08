import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const AuthPage = () => {
  const [activeButton, setActiveButton] = useState('login');

  const handleLoginButtonPress = () => {
    setActiveButton('login');
  };

  const handleRegisterButtonPress = () => {
    setActiveButton('register');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Login" onPress={handleLoginButtonPress} disabled={activeButton === 'login'} />
        <Button title="Register" onPress={handleRegisterButtonPress} disabled={activeButton === 'register'} />
      </View>
      {activeButton === 'login' ? <Login /> : <Register />}
    </View>
  );
};

export default AuthPage;
