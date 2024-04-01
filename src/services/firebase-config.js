import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNw4QNiz207TXdKlZChQj-PBhGxN5cxvo",
    authDomain: "comentarios-b6040.firebaseapp.com",
    projectId: "comentarios-b6040",
    storageBucket: "comentarios-b6040.appspot.com",
    messagingSenderId: "357797482000",
    appId: "1:357797482000:web:684d58b94b1bf030e40495",
    measurementId: "G-10RNC5H20W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the authentication service
const auth = getAuth(app);

// Get a reference to the database service
const db = getDatabase(app);

// Export the necessary instances
export { auth, db, analytics };
