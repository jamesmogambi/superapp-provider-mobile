import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage'
//
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_0c1aTTM1SZKpkzK3_ZHWMTqPVIpC5Xk",
  authDomain: "super-app-5c361.firebaseapp.com",
  //   databaseURL: 'super-app-5c361',
  projectId: "super-app-5c361",
  storageBucket: "super-app-5c361.appspot.com",
  messagingSenderId: "672008568587",
  appId: "1:672008568587:web:52bdaece21d46255ee6c0e",
  measurementId: "G-G01E7Z160C",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
