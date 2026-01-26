// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCAjwzJaepdz3nc_uwQ1gUh7DyQJlEVsNA",
//   authDomain: "arkade-9a528.firebaseapp.com",
//   projectId: "arkade-9a528",
//   storageBucket: "arkade-9a528.firebasestorage.app",
//   messagingSenderId: "847360584705",
//   appId: "1:847360584705:web:67bb10a1ff18eb78df6400"
// };

// // Initialize Firebase
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp;
// const auth = getAuth(app);
// auth.useDeviceLanguage()

// export {auth}






// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAjwzJaepdz3nc_uwQ1gUh7DyQJlEVsNA",
  authDomain: "arkade-9a528.firebaseapp.com",
  projectId: "arkade-9a528",
  storageBucket: "arkade-9a528.firebasestorage.app",
  messagingSenderId: "847360584705",
  appId: "1:847360584705:web:67bb10a1ff18eb78df6400"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app, auth}