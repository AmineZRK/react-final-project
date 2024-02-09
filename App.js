// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './screens/AuthPage';
import HomeScreen from './screens/HomeScreens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
                headerShown: false,
              }}
      >
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen
                options={{
                  animation: "none",
                  gestureEnabled: false,
                }}
                name="HomeScreen"
                component={HomeScreen}
              />
        {/* Add other screens/routes here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
