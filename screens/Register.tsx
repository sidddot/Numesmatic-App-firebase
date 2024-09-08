import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { auth } from '../firebase'; // Import the `auth` from your firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase function for registration
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RootNavigator: undefined;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const registerAndNavigate = async () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          // Use `createUserWithEmailAndPassword` from Firebase v9
          const response = await createUserWithEmailAndPassword(auth, email, password);
          if (response.user) {
            navigation.replace('RootNavigator'); // Success, navigate to the main app
          }
        } catch (e: any) {
          Alert.alert('Registration Failed', e.message || 'Please check your details and try again.');
        }
      } else {
        Alert.alert('Password Mismatch', 'Passwords do not match.');
      }
    } else {
      Alert.alert('Input Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register for Numes</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={setEmail}
        placeholder={'Email'}
        keyboardType={'email-address'}
        autoCapitalize="none"
        accessibilityLabel="Email"
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
      <TextInput
        style={styles.inputBox}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder={'Confirm Password'}
        keyboardType={'default'}
        secureTextEntry={true}
        autoCapitalize="none"
        accessibilityLabel="Confirm Password"
      />
      <Pressable onPress={registerAndNavigate} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
});


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Pressable, Alert, SafeAreaView , Keyboard,Button} from 'react-native';

// import WelcomeScreen from './WelcomeScreen';
// import LoginScreen from './LoginScreen';
// import {useNavigation} from '@react-navigation/native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import db from "@react-native-firebase/database";
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


// export default function Register({navigation}){
//   const [name, setName] =  useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigation();
//   function onRegisterPress() {
    
//   }
//   return (
//     <Pressable style={styles.container} onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.container}>
//           <View >
//             <Text style={styles.headerText}>Register</Text>
//           </View>
//           <View >
//             <TextInput
//               style={styles.loginTextField}
//               placeholder="Name"
//               value={name}
//               onChangeText={setName}
//             />
//             <TextInput
//               style={styles.loginTextField}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               inputMode="email"
//               autoCapitalize="none"
//             />
//             <TextInput
//               style={styles.loginTextField}
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>
//           <Button
//             title="Sign Up"
//             onPress={onRegisterPress}
//           />
//           <Button title="Go Back" onPress={nav.goBack}  />
//         </View>
//       </SafeAreaView>
//     </Pressable>
//   );
// };
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
//   loginTextField: {
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
