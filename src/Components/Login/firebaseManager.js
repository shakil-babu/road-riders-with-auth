import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDf_f01_p8h4IF1PohoHc4s92O87SXtJo",
    authDomain: "road-riders.firebaseapp.com",
    projectId: "road-riders",
    storageBucket: "road-riders.appspot.com",
    messagingSenderId: "652444696077",
    appId: "1:652444696077:web:e8e3dbfc0af899ca5d9f44"
};

export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }
}



export const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    const {displayName, email} = result.user;
    const signedInUser = {
        name:displayName, 
        email:email,
    }
    return signedInUser ;
    // ...
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}


// sign in with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    newUserInfo.name = name ;
    updateUserName(name);
    return newUserInfo;
  })
  .catch( error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}


// sign in with email and password
export const signInWithEmailAndPassword = (email, password) =>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
  })
  .catch(function(error) {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}


// updateUserName
const updateUserName = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function(res) {
    const {displayName} = res.user ;
    return displayName ;
  }).catch(function(error) {
    console.log(error)
  });
}