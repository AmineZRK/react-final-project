import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useCart } from '../../components/Cart/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, getTotalPrice } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [shippingAddress, setShippingAddress] = useState();


  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log(userData);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          console.log(parsedUserData.firstName);
          setFirstName(parsedUserData.firstName);
          setLastName(parsedUserData.lastName || '');
          setAddressLine1(parsedUserData.address || '');
          setAddressLine2(parsedUserData.address_2 || '');
          setCity(parsedUserData.city || '');
          setCountry(parsedUserData.country || '');
          setProvince(parsedUserData.province || '');
          setPostalCode(parsedUserData.postal_code || '');
          setPhone(parsedUserData.phoneNumber || '');
          setCompany(parsedUserData.company || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  // Function to handle the user's input
  const handleChange = () => {
    // Creating an object to store the user's input
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: addressLine1,
      address_2: addressLine2,
      city,
      province,
      postal_code: postalCode,
      phone,
      company,
    };
    // Calling the setShippingAddress function and passing the address object as an argument
    setShippingAddress(address);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => String(item._id)}
          ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
        />
        <View style={styles.cardContainer}>
            <CreditCardInput
              onChange={(form) => {
                setCardNumber(form.values.number);
                setCardExpiry(form.values.expiry);
                setCardCVC(form.values.cvc);
              }}
              allowScroll={true}
              cardScale={0.8}
            />
        </View>
        <View style={styles.address}>
          {/* Creating text inputs for the user's information */}
          <TextInput
            value={firstName}
            onChangeText={(e) => {
              setFirstName(e);
              handleChange();
            }}
            placeholder="First Name"
            style={styles.input}
          />
          <TextInput
            value={lastName}
            onChangeText={(e) => {
              setLastName(e);
              handleChange();
            }}
            placeholder="Last Name"
            style={styles.input}
          />
          <TextInput
            value={addressLine1}
            onChangeText={(e) => {
              setAddressLine1(e);
              handleChange();
            }}
            placeholder="Address"
            style={styles.input}
          />

          <TextInput
            onChangeText={(e) => {
              setCity(e);
              handleChange();
            }}
            placeholder="City"
            style={styles.input}
          />
          <TextInput
            onChangeText={(e) => {
              setCountry(e);
              handleChange();
            }}
            placeholder="Country"
            style={styles.input}
          />
          <TextInput
            onChangeText={(e) => {
              setPostalCode(e);
              handleChange();
            }}
            placeholder="Postal Code"
            style={styles.input}
          />
          <TextInput
          value={phone}
            onChangeText={(e) => {
              setPhone(e);
              handleChange();
            }}
            placeholder="Phone"
            style={styles.input}
          />


        </View>

        {cartItems.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
            <Button
              title="Place Order"
              onPress={() => {
                // Implement place order logic here
                // For demonstration purposes, just navigate back to Home
                navigation.navigate('Home');
              }}
              buttonStyle={styles.placeOrderButton}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: 'lightgray',
    paddingTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
  cardContainer: {
    marginTop: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetail: {
    flex: 1,
    marginRight: 10,
  },
  placeOrderButton: {
    backgroundColor: 'red',
    width: 200,
    marginTop: 20,
  },
  address: {
    marginHorizontal: 2,
  },
});

export default CheckoutScreen;
