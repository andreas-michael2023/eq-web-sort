
  const firebaseConfig = {
  apiKey: "AIzaSyBgjRm-9ABSLQmkdSHeMkYzxNS2uYtKXKs",
  authDomain: "q-method-ucy.firebaseapp.com",
  databaseURL: "https://q-method-ucy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "q-method-ucy",
  storageBucket: "q-method-ucy.appspot.com",
  messagingSenderId: "678029160971",
  appId: "1:678029160971:web:659a19d2fe5d56088b0d0e"
};
  
  firebase.initializeApp(firebaseConfig);  
  var rootRef = firebase.database().ref();