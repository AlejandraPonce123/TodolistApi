import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDj5I-xAe3EMVH53TYYFfGCBDiZfwXOpyA",
  authDomain: "todo-list-7eeb1.firebaseapp.com",
  projectId: "todo-list-7eeb1",
  storageBucket:"todo-list-7eeb1.appspot.com",
  messagingSenderId: "539594776176",
  appId: "1:539594776176:web:4e9c453fb5ef2f6093deb5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, doc };
