import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import MyCollection from '../screens/MyCollection';
import Header from '../component/Header';
import LoginScreen from '../screens/LoginScreen';
import ApiComponent from '../component/ExchangeRate/ApiComponent';
import AddImg from '../component/AddImg';
import { useAuth } from './AuthContext'; // Adjust the path if necessary
import LoginNavigator from './LoginNavigator';

// Import your icons
const homeIcon = require('../assets/homeicon.png');
const collectionIcon = require('../assets/collectionicon.png');
const dollarIcon = require('../assets/dollaricon.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyCollectionNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyCollection"
      component={MyCollection}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddImg"
      component={AddImg}
      options={{
        tabBarLabel: 'AddImage',
        headerShown: true,
        tabBarStyle: { backgroundColor: 'green' },
        tabBarLabelStyle: { color: 'white' },
      }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust offset for iOS
    >
      <Header />
      {user ? (
      <Tab.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleStyle: { fontWeight: 'bold' },
          keyboardHidesTabBar: true, // Keep tab bar visible when keyboard opens
        }}
      >
      
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarLabel: 'Welcome',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#004225' },
            tabBarLabelStyle: { color: 'white' },
            tabBarIcon: ({ focused }) => (
              <Image
                source={homeIcon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            ),
          }}
        />
        
        <Tab.Screen
          name="MyCollectionNavigator"
          component={MyCollectionNavigator}
          options={{
            tabBarLabel: 'MyCollection',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#004225' },
            tabBarLabelStyle: { color: 'white' },
            tabBarIcon: ({ focused }) => (
              <Image
                source={collectionIcon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ApiComponent"
          component={ApiComponent}
          options={{
            tabBarLabel: 'Currency converter',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#004225' },
            tabBarLabelStyle: { color: 'white' },
            tabBarIcon: ({ focused }) => (
              <Image
                source={dollarIcon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
      ): (
        <LoginNavigator />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 200,
    width: 200,
  },
  button: {
    padding: 10,
    marginTop: 10,
  },
});

export default RootNavigator;
