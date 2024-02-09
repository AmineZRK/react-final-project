import React,{ useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const AuthPage = ({ navigation }) => { // Receive navigation as a prop
  const [activeButton, setActiveButton] = useState('login');

  const handleLoginButtonPress = () => {
    setActiveButton('login');
  };

  const handleRegisterButtonPress = () => {
    setActiveButton('register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLoginButtonPress}
          disabled={activeButton === 'login'}
          color={activeButton === 'login' ? '#888' : '#007bff'}
        />
        <Button
          title="Register"
          onPress={handleRegisterButtonPress}
          disabled={activeButton === 'register'}
          color={activeButton === 'register' ? '#888' : '#28a745'}
        />
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
    marginTop:50
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formContainer: {
    width:'80%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default AuthPage;
