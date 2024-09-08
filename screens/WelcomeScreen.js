import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView } from 'react-native';
import App from '../App';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import {auth} from '../firebase';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // No need to manually navigate; the auth context will handle it
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container1}>
          <Image source={require('../assets/home_img.png')} style={styles.img} />
          <Text style={styles.text1}>WELCOME TO THE WORLD OF NUMISMATICS</Text>
        </View>

        <Text style={styles.text}>
          Explore numismatics with the Numes app by reading articles, putting up your collection, and also get a chance to sell and bid your rare coin!
        </Text>

        <Text style={styles.text2}>Go To</Text>

        <Pressable style={styles.button_container} onPress={() => navigation.navigate('MyCollection')}>
          <Text style={styles.button}>My Collection</Text>
        </Pressable>
        <Pressable style={styles.button_container} onPress={() => navigation.navigate('ApiComponent')}>
          <Text style={styles.button}>Currency Converter</Text>
        </Pressable>
        <Pressable style={styles.button_container} onPress={handleLogout}>
          <Text style={styles.button}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D6C426',
    justifyContent: 'center',
  },
  container1: {
    alignItems: 'center',
    backgroundColor: '#D6C426',
    justifyContent: 'center',
    paddingTop: 70,
  },
  button_container: {
    paddingVertical: 5,
  },
  img: {
    height: 310,
    width: 310,
    paddingTop: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: "center",
    color: "#006600",
    opacity: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text1: {
    fontSize: 40,
    fontWeight: '800',
    color: "black",
    textAlign: "center",
    padding: 10,
  },
  text2: {
    fontSize: 30,
    fontWeight: '500',
    color: "black",
    textAlign: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#006600",
    textAlign: 'center',
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: '400',
  }
});

export default WelcomeScreen;



// import React from 'react';
// import MyCollection from './MyCollection';
// import LoginNavigator from '../navigators/LoginNavigator';
// import ApiComponent from '../component/ExchangeRate/ApiComponent';
// import { View, Text, Pressable, Image, Button,StyleSheet, ImageBackground , ScrollView} from 'react-native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // const Tab = createBottomTabNavigator();

// const WelcomeScreen = ({ navigation }) => {
//   return (
//     <ScrollView>
//     <View style={styles.container}>
//         <View style={styles.container1}>
//           <Image source={require('../assets/home_img.png')} style={styles.img} />
//           <Text style={styles.text1}>WELCOME TO THE WORLD OF NUMISMATICS</Text>
//         </View>

//         <Text style={styles.text}>Explore numesmatics with Numes app by reading articles, putting up your collection, and also get a chance to sell and bid your rare coin !!!</Text>
      
      
//       <Text style={styles.text2}>GoTo</Text>
      
//       <Pressable  style={styles.button_container}
//         onPress={() => navigation.navigate('MyCollection')}>
//         <Text style={styles.button}>My Collection</Text>
//       </Pressable>
//       <Pressable  style={styles.button_container}
//         onPress={() => navigation.navigate('ApiComponent')}>
//         <Text style={styles.button}>Currency Converter</Text>
//       </Pressable>
//       <Pressable  style={styles.button_container}
//         onPress={() => navigation.navigate('LoginNavigator')}>
//         <Text style={styles.button}>Logout</Text>
//       </Pressable>
//     </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor:'#D6C426',
//     justifyContent: 'center',
//   },
//   container1: {
//     alignItems: 'center',
//     backgroundColor:'#D6C426',
//     justifyContent: 'center',
//     paddingTop:70,
//   },
//   con: {
//     flex: 1,
//     alignItems: 'center',
//     width:'100%',
//     opacity:0.7,
//     border:0.1,
//     borderBottomRightRadius:40,
//     borderBottomLeftRadius:40,
//   },
//   button_container:{
//     paddingVertical:5,
//   },
//   img: {
//     height: 310,
//     width: 310,
//     paddingTop:100,
//   },
//   text:{
//     fontSize:20,
//     fontWeight: '300',
//     textAlign:"center",
//     color:"#006600",
//     opacity:1,
//     paddingHorizontal:20,
//     paddingVertical:20,
//   },
//   text1:{
//     fontSize:40,
//     fontWeight: '800',
//     color:"black",
//     textAlign:"center",
//     padding:10,
//   },
//   text2:{
//     fontSize:30,
//     fontWeight: '500',
//     color:"black",
//     textAlign:"center",
//     padding:10,
//   },
//   button: {
//     backgroundColor: "#006600",
//     textAlign: 'center',
//     padding: 10,
//     paddingHorizontal:50,
//     borderRadius: 10,
//     color: "#ffffff",
//     fontSize: 15,
//     fontWeight: '400',
//   }
// });

// export default WelcomeScreen;
