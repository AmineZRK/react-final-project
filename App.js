import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Badge } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AuthPage from './screens/AuthPage';
import HomeScreen from './screens/HomeScreens/HomeScreen';
import Profile from './screens/Profile/Profile';
import CartScreen from './screens/CartScreens/CartScreen';
import AddProductScreen from './screens/AdminScreens/AddProductScreen';
import DeleteProductScreen from './screens/AdminScreens/DeleteProductScreen';
import UpdateProductScreen from './screens/AdminScreens/UpdateProductScreen';
import ProductDetail from './components/ProductList/ProductDetail';
import CustomHeader from './components/Navigation/TopBar';

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
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <View>
            <MaterialIcons name="shopping-cart" color={color} size={size} />
            <Badge value={0} status="error" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
          </View>
        ),
        title: 'Cart'
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ header: CustomHeader }}/>
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ header: CustomHeader }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ header: CustomHeader }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
