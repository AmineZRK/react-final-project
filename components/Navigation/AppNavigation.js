// // navigation/AppNavigator.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../../screens/HomeScreens/HomeScreen';
// import ProductsScreen from '../../screens/ProductScreens/ProductListScreen';
// import CartScreen from '../../screens/CartScreens/CartScreen';
// import ProfileScreen from '../../screens/Profile/Profile';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
//   </Stack.Navigator>
// );

// const ProductsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{ headerShown: false }} name="Products" component={ProductsScreen} />
//   </Stack.Navigator>
// );

// const CartStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
//   </Stack.Navigator>
// );

// const ProfileStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
//   </Stack.Navigator>
// );

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen
//           name="Home"
//           component={HomeStack}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Products"
//           component={ProductsStack}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="store" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Cart"
//           component={CartStack}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="shopping-cart" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileStack}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="person" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
