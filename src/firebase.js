import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7Vbk6VXhBTpCGsSWJI6J1ty32mtbA9-M",
  authDomain: "admin-dashboard-82b10.firebaseapp.com",
  projectId: "admin-dashboard-82b10",
  storageBucket: "admin-dashboard-82b10.appspot.com",
  messagingSenderId: "212297536576",
  appId: "1:212297536576:web:97cfb80b807cefeeeafba5",
  measurementId: "G-LDJ8SKD3VN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)