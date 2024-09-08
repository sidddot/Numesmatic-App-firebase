import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Search = ({ value, onChangeText }) => {
  const handleChange = (text) => {
    onChangeText(text);
  };

  const clearSearch = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by name or country"
          value={value}
          onChangeText={handleChange}
          style={styles.input}
        />
        {value ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
  },
  clearButtonText: {
    fontSize: 25,
    color: 'gray',
  },
});

export default Search;



// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

// const Search = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChange = (text) => {
//     setSearchTerm(text);
//     onSearch(text);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     onSearch('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Search by name or country"
//           value={searchTerm}
//           onChangeText={handleChange}
//           style={styles.input}
//         />
//         {searchTerm ? (
//           <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
//             <Text style={styles.clearButtonText}>×</Text>
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
//   clearButton: {
//     position: 'absolute',
//     right: 10,
//   },
//   clearButtonText: {
//     fontSize: 25,
//     color: 'gray',
//   },
// });

// export default Search;
