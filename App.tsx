import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HelloWorldApp from './pages/signUp';
import signIn from './pages/signIn';
import home from './pages/home';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='signIn'>
        <Stack.Screen name="signIn" options={{headerShown:false}} component={signIn} />
        <Stack.Screen name="Home" options={{headerShown:false}} component={home} />
        <Stack.Screen name="signUp" options={{headerShown:false}} component={HelloWorldApp} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
