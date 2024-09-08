import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coinDatabase');

const ImgContainer = () => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM coins', [], (_, { rows }) => {
        // Convert imagePath BLOB to a base64 URI format for Image display
        const coins = rows._array.map((item) => ({
          ...item,
          imagePath: `data:image/png;base64,${item.imagePath}`,
        }));
        setCoinList(coins);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {coinList.map((coin) => (
          <View key={coin.id} style={styles.contimg}>
            <Image source={{ uri: coin.imagePath }} style={styles.img} />
            <Text>{coin.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contimg: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    margin: 2,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ImgContainer;




// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';

// const db = SQLite.openDatabase('coinDatabase');

// const ImgContainer = () => {
//   const [coinList, setCoinList] = useState([]);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql('select * from coins', [], (_, { rows }) => {
//         const coins = rows._array;
//         setCoinList(coins);
//       });
//     });
//   }, []);

//   const getImageUri = async (imagePath) => {
//     if (imagePath) {
//       const uri = await FileSystem.readAsStringAsync(imagePath, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       return { uri: `data:image/png;base64,${uri}` };
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//       {coinList.map((coin) => (
//         <View key={coin.id} style={styles.contimg}>
//           <Image source={getImageUri(coin.imagePath)} style={styles.img} />
//           <Text>{coin.name}</Text>
//           <Text>ID: {coin.id}</Text>
//           <Text>Country: {coin.country}</Text>
//         </View>
//       ))}

//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//   },
//   contimg: {
//     width: 150,
//     padding: 15,
//     borderWidth: 0.1,
//     borderRadius: 20,
//     backgroundColor: '#D6C426',
//     alignItems: 'center',
//   },
//   img: {
//     height: 150,
//     width: 150,
//     borderRadius: 20,
//   },
// });

// export default ImgContainer;
