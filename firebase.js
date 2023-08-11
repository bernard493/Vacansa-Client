import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD5VRi_CrVvqUfjuzSBCMvaHcqDIVsPWqs",
  authDomain: "vacanza-3729c.firebaseapp.com",
  projectId: "vacanza-3729c",
  storageBucket: "vacanza-3729c.appspot.com",
  messagingSenderId: "320410980231",
  appId: "1:320410980231:web:05a91ec1282e515ed08d22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth , db};