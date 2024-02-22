import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

import AuthPage from './screens/AuthPage';
import HomeScreen from './screens/HomeScreens/HomeScreen';
import Profile from './screens/Profile/Profile';
import CartScreen from './screens/CartScreens/CartScreen';
import AddProductScreen from './screens/AdminScreens/AddProductScreen';
import DeleteProductScreen from './screens/AdminScreens/DeleteProductScreen';
import UpdateProductScreen from './screens/AdminScreens/UpdateProductScreen';
import ProductDetail from './components/ProductList/ProductDetail';
import CustomHeader from './components/Navigation/TopBar'; // Updated import
import Search from './components/search/search';
import { CartProvider } from './components/Cart/CartContext'; // Import CartProvider
import CheckoutScreen from './screens/CartScreens/CheckoutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
        title: 'Home'
      }} 
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <View>
            <MaterialIcons name="search" color={color} size={size} />
          </View>
        ),
        title: 'Search'
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        ),
        title: 'Profile'
      }}
    />
  </Tab.Navigator>
);

const AdminScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='AddProductScreen'
      component={AddProductScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="add" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='DeleteProductScreen'
      component={DeleteProductScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="delete" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='UpdateProductScreen'
      component={UpdateProductScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="update" color={color} size={size} />
        ),
      }}
    /> 
  </Tab.Navigator>
);
   
const App = () => {
  return (
    <CartProvider> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="AuthPage" component={AuthPage} />
          <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} /> }}/>
          <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} /> }} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} /> }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} /> }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} /> }} />

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
