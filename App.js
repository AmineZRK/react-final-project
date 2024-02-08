// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './screens/AuthPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthPage" component={AuthPage} />
        {/* Add other screens/routes here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
