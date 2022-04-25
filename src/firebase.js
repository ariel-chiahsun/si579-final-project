// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXeq7q4hrzik-OCuMxOiyUlJ9mK7k4V3g",
  authDomain: "aria-react-images.firebaseapp.com",
  projectId: "aria-react-images",
  storageBucket: "aria-react-images.appspot.com",
  messagingSenderId: "312769933271",
  appId: "1:312769933271:web:34082661b3fcbb32f66592"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);