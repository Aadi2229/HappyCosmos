import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApG7tLKp8CC6Tn1xVujCIeYnH1Qgr2dpc",
  authDomain: "login-signup-bbbf6.firebaseapp.com",
  projectId: "login-signup-bbbf6",
  storageBucket: "login-signup-bbbf6.appspot.com",
  messagingSenderId: "207331148026",
  appId: "1:207331148026:web:b9878545f217e416a74943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const submit=document.getElementById('submit');
submit.addEventListener("click",function(event){
    event.preventDefault()
    const email=document.getElementById('email').value;
const password=document.getElementById('password').value;
const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("creating your account")
    console.log("aadi")
    window.location.href="login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });

})