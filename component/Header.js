import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, Image } from 'react-native';

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MyCollection from '../screens/MyCollection';
// import ApiComponent from './ExchangeRate/ApiComponent';
// import WelcomeScreen from '../screens/WelcomeScreen';


// Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();


// function Root() {
//   return (
//     <Drawer.Navigator useLegacyImplementation>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Profile" component={EmptyScreen} />
//       <Stack.Screen name="Settings" component={EmptyScreen} />
//     </Drawer.Navigator>
//   );
// }
const Header = () => {
  return (
    <View style={styles.container}>
        {/* <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="MyCollection" component={MyCollection} />
      <Drawer.Screen name="ApiComponent" component={ApiComponent} />
      <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Drawer.Navigator> */}
       <Text style={styles.header}>NUMES</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.2,
    
  },
  header:{
    fontSize:28,
    paddingTop:45,
    paddingBottom:15,
    paddingHorizontal:'35%',
    backgroundColor:"#004225",
    color:"white",
  }
});

export default Header ;
