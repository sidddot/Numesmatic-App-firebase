// Example usage in a React Native component
import React, { useEffect , useState } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
// import { fetchData, postData } from './api';

const API_KEY = '7d089d07e1fa0f621e6e0c24';
const BASE_URL =  'https://v6.exchangerate-api.com/v6/'; // Replace this with your actual API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});


const ApiComponent = () => {
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [outputBox, setOutputBox] = useState('');

  const countries = [
    { label: 'United States', value: 'USD' },
    { label: 'NewZealand', value: 'NZD' },
    { label: 'Oman', value: 'OMR' },
  ];
  // const fetchData = async () => {
  //   try {
  //     const response = await api.get('latest/USD'); // Change the endpoint accordingly
  //     console.log('Fetched data:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     console.log('Error response:', error.response); // Log the response for more details
  //   }
  // };
  
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const Convertion = async (x, y) => {
    try {
      const response = await api.get('latest/USD'); // Adjust the endpoint as needed
  
      // Check if the currency codes are present in the response
      if (response.data.conversion_rates && response.data.conversion_rates[x] && response.data.conversion_rates[y]) {
        const rateX = response.data.conversion_rates[x];
        const rateY = response.data.conversion_rates[y];
  
        const convertedValue = rateY / rateX;
        const formattedValue = convertedValue.toFixed(3);
  
        const convertedValues = `${x} to ${y}: ${formattedValue}`;
        setOutputBox(convertedValues);
        console.log('Converted values:', convertedValues);
      } else {
        console.error('Invalid currency codes');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleChange1 = (country1) => {
    console.log(country1.value);
    setCountry1(country1.value);
  };

  const handleChange2 = (country2) => {
    console.log(country2.value);
    setCountry2(country2.value);
    // if (country1 && country2) {
    //   Convertion(country1, country2);
    // }
  };
  const submitData = () => {
    // Add your logic for submitting data here
    // fetchData();
    if (country1 && country2) {
        Convertion(country1, country2);
      }
      else{console.log('both not filled ');}
    console.log('Submitting Data:', country1, country2);
    // const convertedValues = `${x} to ${y}`; // Update this with your conversion logic
    setOutputBox(0);
    // You can send the data to a server or perform any other actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your React Native Component</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countries}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select country"
        searchPlaceholder="Search..."
        value={country1}
        onChange={handleChange1}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countries}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select country"
        searchPlaceholder="Search..."
        value={country2}
        onChange={handleChange2}
      />
       <TouchableOpacity style={styles.submitButton} onPress={submitData}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.outputBox}>{outputBox}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 250,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  outputBox: {
    width: '100%',
    height: 40,
    fontSize: 25,
    padding: 3,
    backgroundColor: 'white',
    borderWidth: 1, // Replace 'border' with 'borderWidth'
    borderColor: 'gray', // Specify the color of the border
    borderRadius: 2,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default ApiComponent;