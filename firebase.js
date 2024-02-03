import firebase from 'firebase/compat/app'; // Import 'compat' version for Firebase v9+
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAVYl59ZvGDpwwB3fWNeU3gqsYj8gVY5iM",
    authDomain: "track-me-e026b.firebaseapp.com",
    projectId: "track-me-e026b",
    storageBucket: "track-me-e026b.appspot.com",
    messagingSenderId: "787218487820",
    appId: "1:787218487820:web:0b02f0e3144cc7b5682c29"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;