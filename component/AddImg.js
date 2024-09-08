import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ref, onValue, set, remove, push } from 'firebase/database'; 
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { db, storage } from '../firebase'; // Ensure this path is correct

const AddImg = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [country, setCountryValue] = useState('');
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);
  const [material, setMaterial] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('Common');
  const [coins, setCoins] = useState([]);
  const [coinType, setCoinType] = useState('');


  useEffect(() => {
    requestPermissions();
    const coinsRef = ref(db, 'coins');

    const unsubscribe = onValue(coinsRef, (snapshot) => {
      const coinsData = [];
      snapshot.forEach((childSnapshot) => {
        coinsData.push({
          uid: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setCoins(coinsData);
    }, (error) => {
      console.error('Error listening to data:', error);
    });

    return () => unsubscribe();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  const pickImage = async (fromCamera = false, imageType) => {
    try {
      let result;
      if (fromCamera) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        if (imageUri) {
          const manipulatedImageUri = await manipulateImage(imageUri);
          if (imageType === 'front') {
            setImageFront(manipulatedImageUri);
          } else {
            setImageBack(manipulatedImageUri);
          }
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const manipulateImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      return manipulatedImage.uri;
    } catch (error) {
      console.error("Error manipulating image:", error);
      throw error;
    }
  };

  const saveCoinToDatabase = async () => {
    if (!textInputValue || !country || !imageFront || !imageBack || !material || !year) {
      Alert.alert('Missing Fields', 'Please fill all fields and select both images.');
      return;
    }

    try {
      const uploadImage = async (imageUri, path) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageRef = storageRef(storage, `images/${path}/${Date.now()}`);
        await uploadBytes(imageRef, blob);
        return getDownloadURL(imageRef);
      };

      const imageFrontUrl = await uploadImage(imageFront, 'front');
      const imageBackUrl = await uploadImage(imageBack, 'back');

      const newCoin = {
        name: textInputValue,
        country,
        material,
        year,
        timestamp: new Date().toISOString(),
        condition,
        coinType: coinType,
        imageFront: imageFrontUrl,
        imageBack: imageBackUrl,
      };

      const newCoinRef = push(ref(db, 'coins'));
      await set(newCoinRef, newCoin);
      setCoins([...coins, { ...newCoin, uid: newCoinRef.key }]);
      setTextInputValue('');
      setCountryValue('');
      setImageFront(null);
      setImageBack(null);
      setMaterial('');
      setYear('');
      setCoinType('');
      setCondition('Common');
    } catch (error) {
      console.error('Error saving coin:', error);
      Alert.alert('Error saving coin', error.message);
    }
  };

  const deleteCoin = async (coinToDelete) => {
    try {
      await remove(ref(db, `coins/${coinToDelete.uid}`));
      setCoins(coins.filter((coin) => coin.uid !== coinToDelete.uid));
    } catch (error) {
      console.log('Error deleting coin:', error);
      Alert.alert('Error deleting coin', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Add your coin here</Text>

      <TouchableOpacity onPress={() => pickImage(false, 'front')}>
        <View style={styles.imagePickerContainer}>
          {imageFront ? (
            <Image source={{ uri: imageFront }} style={styles.imagePickerPreview} />
          ) : (
            <Text>Select Front Image</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pickImage(true, 'front')} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Capture Front Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pickImage(false, 'back')}>
        <View style={styles.imagePickerContainer}>
          {imageBack ? (
            <Image source={{ uri: imageBack }} style={styles.imagePickerPreview} />
          ) : (
            <Text>Select Back Image</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pickImage(true, 'back')} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Capture Back Image</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter coin name"
        value={textInputValue}
        onChangeText={setTextInputValue}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />
      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountryValue}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />
      <TextInput
        placeholder="Material"
        value={material}
        onChangeText={setMaterial}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />
      <TextInput
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />

<View style={styles.radioContainer}>
  <Text>Coin Type:</Text>
  <View style={styles.radioButtonContainer}>
    <TouchableOpacity onPress={() => setCoinType('Rare')}>
      <Text style={[styles.radioButton, coinType === 'Rare' && styles.selectedRadio]}>Rare</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCoinType('Special')}>
      <Text style={[styles.radioButton, coinType === 'Special' && styles.selectedRadio]}>Special</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCoinType('Common')}>
      <Text style={[styles.radioButton, coinType === 'Common' && styles.selectedRadio]}>Common</Text>
    </TouchableOpacity>
  </View>
</View>


      <TouchableOpacity onPress={saveCoinToDatabase} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Save Coin</Text>
      </TouchableOpacity>

      {coins.map((coin) => (
        <View key={coin.uid} style={styles.coinContainer}>
          <Text>{coin.name}</Text>
          <Text>{coin.country}</Text>
          <Image source={{ uri: coin.imageFront }} style={styles.imagePreview} />
          <Image source={{ uri: coin.imageBack }} style={styles.imagePreview} />
          <IconButton icon="delete" onPress={() => deleteCoin(coin)} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  imagePickerPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonStyle: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputStyle: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioText: {
    fontSize: 16,
  },
  coinContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    fontSize: 16,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
  selectedRadio: {
    backgroundColor: 'green',
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  coinImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
});

export default AddImg;

