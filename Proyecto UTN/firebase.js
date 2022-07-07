
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

import {
    getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBJa4Y8K1bTJt5Cef-yvnFQc1BIuwsw_vc",
  authDomain: "libreria-proyecto-1956f.firebaseapp.com",
  projectId: "libreria-proyecto-1956f",
  storageBucket: "libreria-proyecto-1956f.appspot.com",
  messagingSenderId: "1027144670539",
  appId: "1:1027144670539:web:93196d2c778ddc28779cce",
  measurementId: "G-KK5BX3BENT"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(db, "products"));
    
    const products = []

    querySnapshot.forEach((doc) => {
      products.push(doc);
    });

    return products;

}

export const getProduct = async (id) => {
 
    const docRef = doc(db, "products", id);
    
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap;
    } else {
      console.log("No such document!");
    }
    
}

