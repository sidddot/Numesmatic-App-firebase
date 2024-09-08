import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/Register';
import RootNavigator from './RootNavigator'; // Your main app navigator

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RootNavigator" component={RootNavigator} />
    </Stack.Navigator>
  );
}
