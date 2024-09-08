import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { auth } from '../firebase'; // Import the `auth` from your firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method from Firebase
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RootNavigator: undefined;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginAndNavigate = async () => {
    if (email && password) {
      try {
        // Use the `signInWithEmailAndPassword` method with the new modular SDK
        const response = await signInWithEmailAndPassword(auth, email, password);
        if (response.user) {
          navigation.replace('RootNavigator');
        }
      } catch (e) {
        Alert.alert('Login Failed', e.message || 'Please check your email and password.');
      }
    } else {
      Alert.alert('Input Error', 'Please enter both email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Numes</Text>
      <Text style={styles.regularText}>Login to continue</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={setEmail}
        placeholder={'Email'}
        keyboardType={'email-address'}
        autoCapitalize="none"
        accessibilityLabel="Email address"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        keyboardType={'default'}
        secureTextEntry={true}
        autoCapitalize="none"
        accessibilityLabel="Password"
      />
      <Pressable onPress={loginAndNavigate} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    color: '#EDEFEE',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#EDEFEE',
  },
  button: {
    padding: 15,
    backgroundColor: '#EE9972',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  registerText: {
    marginTop: 10,
    color: '#EE9972',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});



// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
// import WelcomeScreen from './WelcomeScreen';
// import {useNavigation} from '@react-navigation/native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import db from "@react-native-firebase/database"
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// export default function LoginScreen({navigation}) {
//   const [email, onChangeEmail] = useState('');
//   const [password, onChangePassword] = useState('');
// //   const navigation = useNavigation();

//   const nav= useNavigation<NativeStackNavigationProp<any>>();

//   const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
//     // db().ref(`/users/${response.user.uid}`).set({ name });
//   };
  
//   const registerAndgotoMenu = async () => {
//     if(password && email){
//       try{
//         const response = await auth().createUserWithEmailAndPassword(email, password);
//         if(response.user){
//           await createProfile(response);
//           nav.replace("Main");
//         }
//       }
//       catch (e){Alert.alert("Oops","Please check your password and email")}
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Welcome to Numes</Text>
//       <Text style={styles.regularText}>Login to continue</Text>
//       <TextInput
//         style={styles.inputBox}
//         value={email}
//         onChangeText={onChangeEmail}
//         placeholder={'email'}
//         keyboardType={'email-address'}
//       />
//       <TextInput
//         style={styles.inputBox}
//         value={password}
//         onChangeText={onChangePassword}
//         placeholder={'password'}
//         keyboardType={'default'}
//         secureTextEntry={true}
//       />
//       <Pressable onPress={() => navigation.navigate('RootNavigation')} style={styles.button}>
//         <Text style={styles.buttonText}>Log in</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.95,
//   },
//   headerText: {
//     padding: 40,
//     fontSize: 30,
//     color: '#EDEFEE',
//     textAlign: 'center',
//   },
//   regularText: {
//     fontSize: 24,
//     padding: 20,
//     marginVertical: 8,
//     color: '#EDEFEE',
//     textAlign: 'center',
//   },
//   inputBox: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     fontSize: 16,
//     borderColor: '#EDEFEE',
//     backgroundColor: '#EDEFEE',
//   },
//   button: {
//     fontSize: 22,
//     padding: 10,
//     marginVertical: 8,
//     marginHorizontal: 100,
//     backgroundColor: '#EE9972',
//     borderColor: '#EE9972',
//     borderWidth: 2,
//     borderRadius: 50,
//   },
//   buttonText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 25,
//   },
// });
