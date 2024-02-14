import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AuthPage from './screens/AuthPage';
import HomeScreen from './screens/HomeScreens/HomeScreen';
import Profile from './screens/Profile/Profile';
import CartScreen from './screens/CartScreens/CartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="HomeStack_Home" component={HomeScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="HomeStack_Cart" component={CartScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="HomeStack_Profile" component={Profile} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="shopping-cart" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
