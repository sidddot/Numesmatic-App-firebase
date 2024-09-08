import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeygzezdaDfl5hJKWdcku92daaijaY638",
  authDomain: "numesapp.firebaseapp.com",
  databaseURL: "https://numesapp-default-rtdb.firebaseio.com/",
  projectId: "numesapp",
  storageBucket: "numesapp.appspot.com",
  messagingSenderId: "834788560655",
  appId: "1:834788560655:android:a95d5122ed69a765cb387a",
};

// Initialize Firebase only if it hasn't been initialized yet
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };


// import { initializeApp } from 'firebase/app'; // Import for v9 SDK
// import { getAuth } from 'firebase/auth'; // Import for Auth
// import { getFirestore } from 'firebase/firestore'; // Import for Firestore
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAeygzezdaDfl5hJKWdcku92daaijaY638",
//   authDomain: "numesapp.firebaseapp.com",
//   databaseURL: "https://numesapp.firebaseio.com",
//   projectId: "numesapp",
//   storageBucket: "numesapp.appspot.com",
//   messagingSenderId: "834788560655",
//   appId: "1:834788560655:android:a95d5122ed69a765cb387a",
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication
// const auth = getAuth(firebaseApp);

// // Initialize Firestore
// const db = getFirestore(firebaseApp);

// // Export the auth and db objects
// export { auth, db };
