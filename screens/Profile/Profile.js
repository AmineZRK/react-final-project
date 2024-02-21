// components/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import AuthService from '../../firebase/services/AuthService';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();

        if (currentUser) {
          const userData = await AuthService.getUserData(currentUser.uid);
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
const handleLogout = () => {
  AuthService.logout();
  navigation.navigate('AuthPage');
}
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: 'https://placekitten.com/200/200' }} // Replace with the user's profile picture URL
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.title}>Profile</Text>
          <Divider style={styles.divider} />
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.text}>{userData.firstName}</Text>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.text}>{userData.lastName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{userData.address}</Text>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{userData.phoneNumber}</Text>
          <Text style={styles.label}>Birth Date:</Text>
          <Text style={styles.text}>{userData.birthDate}</Text>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f8ff', // Marine Blue Color
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', // Black Color
  },
  divider: {
    backgroundColor: '#000', // Black Color
    height: 2,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark Gray Color
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555', // Gray Color
  },
});

export default Profile;
