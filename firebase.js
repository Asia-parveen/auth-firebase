import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, sendEmailVerification, signOut  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAg9BXWDSJJbcmxdc8bxFUp7u3CeHj5EHI",
    authDomain: "auth-app-3cbca.firebaseapp.com",
    projectId: "auth-app-3cbca",
    storageBucket: "auth-app-3cbca.firebasestorage.app",
    messagingSenderId: "213089900546",
    appId: "1:213089900546:web:0548ded0f4288dd4426f1b",
    measurementId: "G-S0TE18T9W9"
  };

  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

export { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword,  onAuthStateChanged, updateProfile, sendEmailVerification, signOut  }