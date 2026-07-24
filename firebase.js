// Firebase Configuration
// Replace with your own Firebase project details

const firebaseConfig = {

apiKey:"YOUR_API_KEY",

authDomain:"YOUR_PROJECT.firebaseapp.com",

databaseURL:"YOUR_DATABASE_URL",

projectId:"YOUR_PROJECT",

storageBucket:"YOUR_BUCKET",

messagingSenderId:"YOUR_ID",

appId:"YOUR_APP_ID"

};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();