import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, RefreshControl, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../component/Search';
import AddImg from '../component/AddImg';
import { ref, onValue, get } from 'firebase/database'; 
import { db, auth } from '../firebase'; // Import the auth module

const Stack = createNativeStackNavigator();

const MyCollection = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCoins = () => {
      const userId = auth.currentUser?.uid; // Get the current user's ID
      if (!userId) {
        console.error('User not authenticated');
        return;
      }

      const coinsRef = ref(db, `users/${userId}/coins`); // Access the coins under the user's node

      const unsubscribe = onValue(coinsRef, (snapshot) => {
        console.log('Data received from Realtime Database');
        const coinsData = [];
        snapshot.forEach((childSnapshot) => {
          const coin = {
            uid: childSnapshot.key,
            ...childSnapshot.val(),
          };
          coinsData.push(coin);
          console.log('Coin data:', coin); // Log each coin's data
        });
        setCoins(coinsData);
        setFilteredCoins(coinsData); // Initialize filteredCoins with all coins
      });

      return () => unsubscribe();
    };

    fetchCoins();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const userId = auth.currentUser?.uid; // Get the current user's ID
      if (!userId) {
        console.error('User not authenticated');
        return;
      }

      const snapshot = await get(ref(db, `users/${userId}/coins`));
      const coinsData = [];
      snapshot.forEach((childSnapshot) => {
        coinsData.push({
          uid: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setCoins(coinsData);
      setFilteredCoins(coinsData); // Reset filteredCoins after refresh
    } catch (error) {
      console.error('Error refreshing coins:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(term.toLowerCase()) ||
      coin.country.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen 
          name="My Collection" 
          options={{ headerTitle: 'My Collection' }}
        >
          {() => (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              <Search value={searchTerm} onChangeText={handleSearch} />
              <Pressable 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddImg')}
              >
                <Text style={styles.addButtonText}>Add New Coin</Text>
              </Pressable>
              {filteredCoins.length === 0 ? (
                <Text style={styles.noDataText}>No coins found</Text>
              ) : (
                filteredCoins.map((coin) => (
                  <View key={coin.uid} style={styles.coinContainer}>
                    {coin.imageFront && (
                      <Image source={{ uri: coin.imageFront}} style={styles.coinImage} />
                    )}
                    <View style={styles.textContainer}>
                      <Text style={styles.coinName}>{coin.name}</Text>
                      <Text style={styles.coinCountry}>{coin.country}</Text>
                      <Text style={styles.coinYear}>{coin.year}</Text>
                      <Text style={styles.coinType}>{coin.coinType}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="AddImg" 
          component={AddImg}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  coinImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'column',
  },
  coinName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  coinCountry: {
    fontSize: 16,
    color: '#555',
  },
  coinYear: {
    fontSize: 14,
    color: '#000',
  },
  coinType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MyCollection;

