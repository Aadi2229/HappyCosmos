import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("aadi")
    window.location.href="gallery.html";
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

})